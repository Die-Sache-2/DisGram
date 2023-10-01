import { Telegraf } from 'telegraf';
import telegramEvents from './events/index.mjs';
import session from '@telegraf/session';
import stage from './scenes/index.mjs';
import telegramCommands from './commands/index.mjs';
import rabbitmq from "../rabbitmq/index.mjs";

let telegramBot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
telegramBot.use(session());
telegramBot.use(stage.middleware());

telegramBot.on("channel_post", telegramEvents.channelPost);
telegramBot.on("forward_date", telegramEvents.subscribe);
telegramCommands.forEach((command, name) => {
    telegramBot.command(name, command.execute);
})

let channel = await rabbitmq.createChannel();
await channel.assertQueue("task");
await channel.consume("task", (msg) => {
    if (msg !== null) {
        console.log('Received:', msg.content.toString());
        channel.ack(msg);
    } else {
        console.log('Consumer cancelled by server');
    }
});

export default telegramBot;