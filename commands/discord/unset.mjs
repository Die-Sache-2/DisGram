import db from '../../db/models/index.mjs';

let unset = {
    execute: async interaction => {
        db.DiscordChannel.destroy({
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
