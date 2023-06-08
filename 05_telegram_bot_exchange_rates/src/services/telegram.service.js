import TelegramBot from "node-telegram-bot-api";
import CacheService from "./cache.service.js";
import TgBtns from "../telegram/tgBtns.js";
import TgMsgs from "../telegram/tgMessages.js";
import TgTxts from "../telegram/tgTxts.js";

export default class TelegramService {
  telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
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
        chat: { id: chatId, first_name },
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
        if (
          !this.cacheService.isCacheHas("mb") ||
          !this.cacheService.isCacheHas("pb")
        ) {
          try {
            await this.cacheService.setMbExchangeRatesToCache();
            await this.cacheService.setPbExchangeRatesToCache();
          } catch (error) {
            return await this.sendErrorMessage(error.message, chatId);
          }
        }

        const currency = text === TgTxts.EUR ? "EUR" : "USD";
        const { mb: mbExchangeRates, pb: pbExchangeRates } =
          this.cacheService.getManyFromCache(["mb", "pb"]);

        const resultMessage =
          "💱EXCHANGE RATES:\n\n" +
          "Privatbank🏛️\n" +
          TgMsgs.result(currency, pbExchangeRates) +
          "Monobank📱\n" +
          TgMsgs.result(currency, mbExchangeRates) +
          "Was delighted to assist😊";

        return await this.bot.sendMessage(chatId, resultMessage);
      }

      return await this.bot.sendMessage(
        chatId,
        TgMsgs.startMessage(first_name),
        TgBtns.startButton
      );
    });
  }

  async sendErrorMessage(errorMessage, chatId) {
    console.log(errorMessage);
    return await this.bot.sendMessage(chatId, TgMsgs.sorry, TgBtns.startButton);
  }

  async initTgBot() {
    this.setTgCommands();
    this.onCommandsTgBot();
    this.onMessageTgBot();
  }
}
