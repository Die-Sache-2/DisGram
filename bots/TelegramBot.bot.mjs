import { Telegraf } from 'telegraf';

let telegramBot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

export default telegramBot;