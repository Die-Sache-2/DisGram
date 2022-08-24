import db from "../../db/index.mjs";
import validateCommandOptions from "./utils/Validations.mjs";
import parseCommand from 'minimist';

let subscribe = {
    data: {
        options: ['_', 'target', 'retention-time'],
        mandatory: ['source']
    },
    execute: async function (ctx) {
        let channel_post = ctx.update.channel_post ?? ctx.update.message;
        let commandOptions = parseCommand(channel_post.text.split(' ').slice(2));
        if (!await validateCommandOptions(this, commandOptions, ctx)) return;
        let telegramChannelId = commandOptions.target.toString() ?? channel_post.chat.id.toString();
        let channelCount = await db.TelegramChannel.count({
            where: {
                channelId: telegramChannelId
            }
        })
        if (!channelCount) {
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
                subscriptionIdentifier: commandOptions.source
            }
        });
        let user = await db.TelegramUser.findOne({
            where: {
                userId: ctx.update.message.from.id.toString()
            }
        });
        await db.Subscription.create({
            TelegramChannelId: telegramChannel.dataValues.id,
            DiscordChannelId: discordChannel.dataValues.id,
            TelegramUserId: user.dataValues.id,
            retentionTime: Number(commandOptions['retention-time'])
        });
        ctx.reply(`Dieser Kanal hat nun den Discord Kanal ${discordChannel.dataValues.channelName} abonniert!`);
    }
}
export default subscribe;