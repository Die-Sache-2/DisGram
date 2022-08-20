import db from '../db/models/index.js';
import { telegramBot } from '../bots/index.mjs';

let messageCreate = async message => {
    let subscriptionPromise = await db.Subscription.findAll({
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

    let subscriptions = subscriptionPromise.map(it => it.dataValues).map(it => ({
        discordChannelId: it.DiscordChannel.dataValues.channelId,
        telegramChannelId: it.TelegramChannel.dataValues.channelId
    }));

    for (let subscription of subscriptions) {
        let { telegramChannelId, discordChannelId } = subscription;
        if (message.channelId === discordChannelId) {
            telegramBot.telegram.sendMessage(telegramChannelId, message.content);
        }
    }
}

export default messageCreate;