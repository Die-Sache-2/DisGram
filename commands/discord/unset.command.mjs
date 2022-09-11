import db from '../../db/index.mjs';
import { validateDiscordRegistration, validateSubscribableDiscordChannel } from '../../utils/Validations.mjs';

let unset = {
    execute: async interaction => {
        if (!await validateDiscordRegistration(interaction.user.id)) {
            return await interaction.reply({
                content: "Fehlende Berechtigungen für diesen Befehl!",
                ephemeral: true
            }
            );
        }

        if (!await validateSubscribableDiscordChannel(interaction.channelId)) {
            return await interaction.reply({
                content: "Dieser Kanal ist bereits nicht abonnierbar!",
                ephemeral: true
            }
            );
        }

        await db.DiscordChannel.destroy({
            where: {
                channelId: interaction.channelId
            }
        });
        await interaction.reply({
            content: "Dieser Kanal ist nun nicht mehr abonnierbar!",
            ephemeral: true
        }
        );
    }
}

export default unset;
