import db from '../../db/index.mjs';
import {discordBot} from '../../bots/index.mjs';


let set = {
    execute: async interaction => {

        let user = await db.DiscordUser.findOne({
            where: {
                userId: interaction.user.id
            }
        });

        if (!user) {
            await interaction.reply({
                    content: "Fehlende Berechtigungen für diesen Befehl!",
                    ephemeral: true
                }
            );
            return;
        }

        let channelId = interaction.channelId;

        let subscribedChannel = await db.DiscordChannel.findOne({
            where: {
                channelId
            }
        });

        if (subscribedChannel) {
            await interaction.reply({
                    content: "Dieser Kanal ist bereits abonnierbar!",
                    ephemeral: true
                }
            );
            return;
        }

        let channelName = discordBot.channels.cache.get(interaction.channelId).name;
        let subscriptionIdentifier = interaction.options.getString("id") ?? discordBot.channels.cache.get(interaction.channelId).name;

        await db.DiscordChannel.create({
            channelId,
            channelName,
            subscriptionIdentifier
        });

        await interaction.reply({
                content: `Dieser Kanal ist nun unter dem Namen ${subscriptionIdentifier} abonnierbar!`,
                ephemeral: true
            }
        );
    }
}

export default set;