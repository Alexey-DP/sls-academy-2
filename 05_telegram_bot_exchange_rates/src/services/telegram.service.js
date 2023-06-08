import TelegramBot from "node-telegram-bot-api";
import CacheService from "./cache.service.js";
import TgBtns from "../telegram/tgBtns.js";
import TgMsgs from "../telegram/tgMessages.js";
import TgTxts from "../telegram/tgTxts.js";

export default class TelegramService {
  telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
  timeToUpdateExchangeRates = 5 * 60 * 1000;
  bot = new TelegramBot(this.telegramBotToken, { polling: true });
  cacheService = new CacheService();

  setTgCommands() {
    this.bot.setMyCommands([
      {
        command: "/start",
        description: "Start",
      },
    ]);
  }

  onCommandsTgBot() {
    this.bot.onText(/\/start/, async (msg) => {
      const { id: chatId, first_name } = msg.chat;
      await this.bot.sendMessage(
        chatId,
        TgMsgs.startMessage(first_name),
        TgBtns.startButton
      );
    });
  }

  onMessageTgBot() {
    this.bot.on("message", async (msg) => {
      const {
        chat: { id: chatId },
        text,
      } = msg;

      if (text.indexOf("/") >= 0) {
        return;
      }

      if (text === TgTxts.selectCurrency) {
        return await this.bot.sendMessage(
          chatId,
          TgMsgs.preferCurrency,
          TgBtns.currency
        );
      }

      if (text === TgTxts.EUR || text === TgTxts.USD) {
        const preferCurrency = text === TgTxts.EUR ? "EUR" : "USD";
        this.cacheService.setToCache(chatId, preferCurrency);
        return await this.bot.sendMessage(
          chatId,
          TgMsgs.preferBank,
          TgBtns.bank
        );
      }

      if (text === TgTxts.pb || text === TgTxts.mb) {
        const preferBank = text === TgTxts.pb ? "pb" : "mb";
        const currency = this.cacheService.getFromCache(chatId);
        const exchangeRates = this.cacheService.getFromCache(preferBank);
        if (!exchangeRates || !currency) {
          return await this.bot.sendMessage(
            chatId,
            TgMsgs.sorry,
            TgBtns.startButton
          );
        }
        return await this.bot.sendMessage(
          chatId,
          TgMsgs.result(currency, exchangeRates)
        );
      }

      if (text === TgTxts.back) {
        return await this.bot.sendMessage(
          chatId,
          TgMsgs.preferCurrency,
          TgBtns.currency
        );
      }

      return await this.bot.sendMessage(
        chatId,
        TgMsgs.startMessage("Friend"),
        TgBtns.startButton
      );
    });
  }

  async initTgBot() {
    try {
      await this.cacheService.setPbExchangeRatesToCache();
      await this.cacheService.setMbExchangeRatesToCache();
      this.setTgCommands();
      this.onCommandsTgBot();
      this.onMessageTgBot();
      const updatePbExchangeRates = setInterval(async () => {
        await this.cacheService.setPbExchangeRatesToCache();
      }, this.timeToUpdateExchangeRates);
      const updateMbExchangeRates = setInterval(async () => {
        await this.cacheService.setMbExchangeRatesToCache();
      }, this.timeToUpdateExchangeRates);
    } catch (error) {
      console.log(error.message);
    }
  }
}
