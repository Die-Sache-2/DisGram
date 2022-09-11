import db from '../../db/index.mjs';
import { validateDiscordRegistration } from '../../utils/Validations.mjs';

let unregister = {
    execute: async interaction => {
        if (!await validateDiscordRegistration(interaction.user.id)) {
            return interaction.reply({
                content: `Der Nutzer ${interaction.user.username} ist bereits nicht registriert!`,
                ephemeral: true
            }
            );
        }
        await db.DiscordUser.destroy({
            where: {
                userId: interaction.user.id
            }
        })
        await interaction.reply({
            content: `Die Registrierung des Nutzers ${interaction.user.username} wurde erfolgreich aufgehoben!`,
            ephemeral: true
        }
        );
    }
}

export default unregister;