import {Telegraf} from 'telegraf';
import telegramEvents from './events/index.mjs';
import session from '@telegraf/session';
import stage from './scenes/index.mjs';
import telegramCommands from './commands/index.mjs';
import rabbitmq from "../rabbitmq/index.mjs";
import db from "../db/index.mjs";
import {setLongTimeout} from "long-settimeout";
import {markdownv2 as format} from "telegram-format";

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
await channel.consume("task", async (message) => {
    await receiveMessage(message);
    channel.ack(message);
});

async function receiveMessage(message) {
    let subscriptions = await db.Subscription.findAll({
        include: [
            {
                model: db.DiscordChannel,
                attributes: ["channelId"]
            },
            {
                model: db.TelegramChannel,
                attributes: ["channelId"]
            },
        ]
    })

    let parsedSubscriptions = subscriptions.map(it => it.dataValues).map(it => ({
        id: it.id,
        discordChannelId: it.DiscordChannel.dataValues.channelId,
        telegramChannelId: it.TelegramChannel.dataValues.channelId,
        retentionTime: it.retentionTime
    }));

    for (let subscription of parsedSubscriptions) {
        let {telegramChannelId, discordChannelId, retentionTime} = subscription;
        if (message.properties.headers.channelId === discordChannelId) {
            let telegramMessage = await telegramBot.telegram.sendMessage(telegramChannelId, format.escape(message.content.toString()), {parse_mode: 'MarkdownV2'});
            await db.MessageLink.create({
                discordMessageId: message.properties.headers.channelId,
                telegramMessageId: telegramMessage.message_id.toString(),
                SubscriptionId: subscription.id,
            });
            if (subscription.retentionTime && retentionTime <= 1_000_000_000) {
                setLongTimeout(() => {
                    telegramBot.telegram.deleteMessage(telegramChannelId, telegramMessage.message_id);
                }, 1000 * 60 * retentionTime);
            }
        }
    }
}

export default telegramBot;