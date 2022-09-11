import db from '../../db/index.mjs';
import { validateDiscordRegistration } from '../../utils/Validations.mjs';

let register = {
    execute: async interaction => {
        if (await validateDiscordRegistration(interaction.user.id)) {
            return interaction.reply({
                content: `Der Nutzer ${interaction.user.username} ist bereits registriert!`,
                ephemeral: true
            }
            );
        }
        let token = interaction.options.getString('token');
        if (token !== process.env.TOKEN) {
            await interaction.reply({
                content: "Ungültiger Token. Registrierung verweigert!",
                ephemeral: true
            }
            );
            return;
        }
        await db.DiscordUser.create({
            userId: interaction.user.id,
            name: interaction.user.username
        })
        await interaction.reply({
            content: `Der Nutzer ${interaction.user.username} wurde erfolgreich registriert!`,
            ephemeral: true
        }
        );
    }
}

export default register;