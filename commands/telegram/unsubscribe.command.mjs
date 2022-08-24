import db from "../../db/index.mjs";
import validateCommandOptions from "./utils/Validations.mjs";
import parseCommand from "minimist";

let unsubscribe = {
    data: {
        options: ['_', 'target'],
        mandatory: ['source']
    },
    execute: async function (ctx) {

        let channel_post = ctx.update.channel_post ?? ctx.update.message;
        let commandOptions = parseCommand(channel_post.text.split(' ').slice(2));
        if (!await validateCommandOptions(this, commandOptions, ctx)) return;

       // let [, , subscriptionIdentifier, inputTelegramChannelId] = channel_post.text.split(' ');
        let telegramChannelId = commandOptions.target.toString() ?? channel_post.chat.id.toString();

        let telegramChannel = await db.TelegramChannel.findOne({
            where: {
                channelId: telegramChannelId
            }
        });
        let discordChannel = await db.DiscordChannel.findOne({
            where: {
                subscriptionIdentifier: commandOptions.source.toString()
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