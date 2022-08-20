import 'dotenv/config';
import db from './db/models/index.js';
import { discordBot, telegramBot } from './bots/index.mjs';
import { interactionCreate, messageCreate } from './events/index.mjs';

discordBot.on('interactionCreate', interactionCreate);
discordBot.on("messageCreate", messageCreate);

telegramBot.on("channel_post", async ctx => {
    console.log(ctx.update.channel_post.text);
    let channel_post = ctx.update.channel_post;
    let telegramChannelId = ctx.update.channel_post.chat.id.toString();
    if (channel_post.text.startsWith("/disgram ")) {
        let commandParts = channel_post.text.split(' ');
        if (commandParts[1] === "subscribe") {

            let subscriptionIdentifier = commandParts[2];
            let count = await db.TelegramChannel.count({
                where: {
                    channelId: telegramChannelId
                }
            })
            if (!count) {
                await db.TelegramChannel.create({
                    channelId: telegramChannelId,
                    name: ctx.update.channel_post.chat.title
                });
            }
            let telegramChannel = await db.TelegramChannel.findOne({
                where: {
                    channelId: telegramChannelId
                }
            });
            let discordChannel = await db.DiscordChannel.findOne({
                where: {
                    subscriptionIdentifier: subscriptionIdentifier
                }
            });
            await db.Subscription.create({
                TelegramChannelId: telegramChannel.dataValues.id,
                DiscordChannelId: discordChannel.dataValues.id
            });
        }
        if (commandParts[1] === "unsubscribe") {
            let telegramChannel = await db.TelegramChannel.findOne({
                where: {
                    channelId: telegramChannelId
                }
            });
            let discordChannel = await db.DiscordChannel.findOne({
                where: {
                    subscriptionIdentifier: commandParts[2]
                }
            });
            db.Subscription.destroy({
                where: {
                    TelegramChannelId: telegramChannel.dataValues.id,
                    DiscordChannelId: discordChannel.dataValues.id
                }
            });
        }
    }
})



telegramBot.command("disgram", ctx => {
    console.log("COMMAND");
    ctx.reply("Hi");
})

telegramBot.launch();
discordBot.login(process.env.DISCORD_BOT_TOKEN);


