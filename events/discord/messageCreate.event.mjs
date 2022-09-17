import db from '../../db/index.mjs';
import {telegramBot} from '../../bots/index.mjs';
import {setLongTimeout} from "long-settimeout";
import {markdownv2 as format} from "telegram-format";

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
        id: it.id,
        discordChannelId: it.DiscordChannel.dataValues.channelId,
        telegramChannelId: it.TelegramChannel.dataValues.channelId,
        retentionTime: it.retentionTime
    }));

    for (let subscription of parsedSubscriptions) {
        let {telegramChannelId, discordChannelId, retentionTime} = subscription;
        if (message.channelId === discordChannelId) {
            let telegramMessage = await telegramBot.telegram.sendMessage(telegramChannelId, await appendSignature(format.escape(message.content)), {parse_mode: 'MarkdownV2'});
            await db.MessageLink.create({
                discordMessageId: message.id.toString(),
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

async function appendSignature(content) {
    let signature = (await db.Signature.findAll())[0]?.dataValues?.content;
    return content + (signature ? '\n\n' + signature : '');
}

export default messageCreate;