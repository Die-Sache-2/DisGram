import db from '../../db/index.mjs';

let unset = {
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
