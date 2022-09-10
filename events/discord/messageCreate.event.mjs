import db from '../../db/index.mjs';
import { telegramBot } from '../../bots/index.mjs';
import {setLongTimeout} from "long-settimeout";
import validatePrivileges from "./Validation.mjs";

let messageCreate = async message => {
    if(!(await validatePrivileges(message))){
        return;
    }


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
            let telegramMessage = await telegramBot.telegram.sendMessage(telegramChannelId, await appendSignature(message.content), { parse_mode: 'MarkdownV2' });
            if (subscription.retentionTime && retentionTime <= 1_000_000_000) {
                setLongTimeout(() => {
                    telegramBot.telegram.deleteMessage(telegramChannelId, telegramMessage.message_id);
                }, 1000 * 60 * retentionTime);
            }
        }
    }
}

async function appendSignature(content){
    let signature = (await db.Signature.findAll())[0]?.dataValues?.content;
    return content + (signature ? '\n\n' + signature : '');
}

export default messageCreate;