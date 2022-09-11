import modal from "../../modals/signature.modal.mjs";
import { validateDiscordRegistration } from "../../utils/Validations.mjs";
let signature = {
    execute: async interaction => {
        if (!await validateDiscordRegistration(interaction.user.id)) {
            return await interaction.reply({
                content: "Fehlende Berechtigungen für diesen Befehl!",
                ephemeral: true
            }
            )
        }
        await interaction.showModal(modal.form);
    }
}

export default signature;
