import TelegramBot from "node-telegram-bot-api";

export default class TelegramService {
  constructor(options) {
    this.telegramBotToken = options.telegramBotToken;
    this.chatId = options.chatId;
    this.bot = new TelegramBot(this.telegramBotToken, { polling: true });
  }

  async sendMessage(message) {
    return await this.bot.sendMessage(this.chatId, message);
  }

  async sendPhoto(photoPath) {
    return await this.bot.sendPhoto(this.chatId, photoPath);
  }
}
