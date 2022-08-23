import db from "../../db/index.mjs";

let unsubscribe = {
    execute: async (ctx) => {
        let channel_post = ctx.update.channel_post ?? ctx.update.message;

        let [, , subscriptionIdentifier, inputTelegramChannelId] = channel_post.text.split(' ');
        let telegramChannelId = inputTelegramChannelId ?? channel_post.chat.id.toString();

        let telegramChannel = await db.TelegramChannel.findOne({
            where: {
                channelId: telegramChannelId
            }
        });
        let discordChannel = await db.DiscordChannel.findOne({
            where: {
                subscriptionIdentifier
            }
        });
        await db.Subscription.destroy({
            where: {
                TelegramChannelId: telegramChannel.dataValues.id,
                DiscordChannelId: discordChannel.dataValues.id
            }
        });
    }
}

export default unsubscribe;