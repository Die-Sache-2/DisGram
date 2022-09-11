import db from '../../db/index.mjs';
import { discordBot } from '../../bots/index.mjs';
import { validateDiscordRegistration, validateSubscribableDiscordChannel } from '../../utils/Validations.mjs';


let set = {
    execute: async interaction => {
        if (!await validateDiscordRegistration(interaction.user.id)) {
            return await interaction.reply({
                content: "Fehlende Berechtigungen für diesen Befehl!",
                ephemeral: true
            }
            )
        }

        if (await validateSubscribableDiscordChannel(interaction.channelId)) {
            return await interaction.reply({
                content: "Dieser Kanal ist bereits abonnierbar!",
                ephemeral: true
            }
            );
        }

        let channelName = discordBot.channels.cache.get(interaction.channelId).name;
        let subscriptionIdentifier = interaction.options.getString("id") ?? discordBot.channels.cache.get(interaction.channelId).name;

        await db.DiscordChannel.create({
            channelId: interaction.channelId,
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