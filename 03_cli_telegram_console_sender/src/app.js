import { program } from "commander";
import TelegramService from "./services/telegram.service.js";

const telegramService = new TelegramService({
  telegramBotToken: process.env.TELEGRAM_BOT_TOKEN,
  chatId: process.env.TELEGRAM_CHAT_ID,
});

program.version("0.0.1");

program
  .command("send-message")
  .alias("m")
  .description("Send a message to Telegram Bot")
  .argument("<message>", "Message to Telegram Bot")
  .action(async (msg) => {
    try {
      const messageInfo = await telegramService.sendMessage(msg);
      console.log(
        `You successfully sent a message to your telegram bot: "${messageInfo.from.first_name}"`
      );
      process.exit();
    } catch (error) {
      console.log(error.message);
      process.exit(1);
    }
  });

program
  .command("send-photo")
  .alias("p")
  .description(
    "Send a photo to Telegram Bot. Just drag and drop it console after p-flag"
  )
  .argument("<path>", "Path to photo")
  .action(async (path) => {
    try {
      const photoInfo = await telegramService.sendPhoto(path);
      console.log(
        `You successfully sent a photo to your telegram bot: "${photoInfo.from.first_name}"`
      );
      process.exit();
    } catch (error) {
      console.log(error.message);
      process.exit(1);
    }
  });

program.parse(process.argv);
