import "dotenv/config";
import TelegramService from "./services/telegram.service.js";

await new TelegramService().initTgBot();
