import db from '../../db/index.mjs';
import { discordBot } from '../../bots/index.mjs';


let set = {
    execute: async interaction => {
        let channelId = interaction.channelId;
        let channelName = discordBot.channels.cache.get(interaction.channelId).name;
        let subscriptionIdentifier = interaction.options.getString("id") ?? discordBot.channels.cache.get(interaction.channelId).name;

        let subscribedChannel = await db.DiscordChannel.findOne({
            where: {
                channelId
            }
        });

        if (subscribedChannel) {
            console.log("Dieser Kanal ist bereits abonnierbar!");
            return;
        }

        await db.DiscordChannel.create({
            channelId,
            channelName,
            subscriptionIdentifier
        });

        await interaction.reply({
            content: "Dieser Kanal ist nun abonnierbar!",
            ephemeral: true
        }
        );
    }
}

export default set;