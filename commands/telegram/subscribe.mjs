import db from "../../db/models/index.mjs";

let subscribe = {
    execute: async (ctx) => {
        let channel_post = ctx.update.channel_post ?? ctx.update.message;

        let [, , subscriptionIdentifier, inputTelegramChannelId] = channel_post.text.split(' ');
        let telegramChannelId = inputTelegramChannelId ?? channel_post.chat.id.toString();

        let count = await db.TelegramChannel.count({
            where: {
                channelId: telegramChannelId
            }
        })
        if (!count) {
            await db.TelegramChannel.create({
                channelId: telegramChannelId,
                name: channel_post.chat.title
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
}
export default subscribe;