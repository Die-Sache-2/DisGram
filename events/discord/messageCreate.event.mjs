import db from '../../db/index.mjs';
import { telegramBot } from '../../bots/index.mjs';

let messageCreate = async message => {
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
        discordChannelId: it.DiscordChannel.dataValues.channelId,
        telegramChannelId: it.TelegramChannel.dataValues.channelId,
        retentionTime: it.retentionTime
    }));

    for (let subscription of parsedSubscriptions)  {
        let { telegramChannelId, discordChannelId, retentionTime } = subscription;
        if (message.channelId === discordChannelId) {
            let telegramMessage = await telegramBot.telegram.sendMessage(telegramChannelId, message.content);
            if (subscription.retentionTime) {
                setTimeout(() => {
                    telegramBot.telegram.deleteMessage(telegramChannelId, telegramMessage.message_id);
                }, 1000 * 60 * retentionTime);
            }
        }
    }
}

export default messageCreate;