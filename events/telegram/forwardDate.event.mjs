import telegramBotBot from "../../bots/TelegramBot.bot.mjs";
import { telegramCommands } from '../../commands/index.mjs';
import { Keyboard, Key } from 'telegram-keyboard';
import { telegramBot } from "../../bots/index.mjs";
import db from "../../db/index.mjs";

let forwardDate = async ctx => {
    ctx.session.data = {
        telegramChannelId: ctx.update.message.forward_from_chat.id,
        telegramChannelName: ctx.update.message.title,
        userId: ctx.message.from.id
    }
    await ctx.scene.enter('SUBSCRIBE_SCENE_ID');
}

export default forwardDate;
