import { Telegraf } from 'telegraf';
import { telegramEvents } from '../events/index.mjs';
import session from '@telegraf/session';
import stage from '../scenes/index.mjs';
import telegramCommands from '../commands/telegram/index.mjs';

let telegramBot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
telegramBot.use(session());
telegramBot.use(stage.middleware());

telegramBot.on("channel_post", telegramEvents.channelPost);
telegramBot.on("forward_date", telegramEvents.subscribe);
telegramCommands.forEach((command, name) => {
    telegramBot.command(name, command.execute);
})

export default telegramBot;