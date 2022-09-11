import { ActionRowBuilder, ModalBuilder, TextInputBuilder } from 'discord.js';
import db from '../db/index.mjs';

const form = new ModalBuilder()
    .setCustomId('signatureModal')
    .setTitle('Erstelle eine Signatur');

const signatureInput = new TextInputBuilder()
    .setCustomId('signatureInput')
    .setLabel("Gebe hier die gewünschte Signatur ein!")
    .setStyle("Paragraph");

const signatureActionRow = new ActionRowBuilder().addComponents(signatureInput);

form.addComponents(signatureActionRow);

let modal = {
    form,
    process: async (interaction) => {
        const signatureContent = interaction.fields.getTextInputValue('signatureInput');
        let signatureId = (await db.Signature.findAll())[0]?.dataValues?.id;
        await db.Signature.upsert({
            id: signatureId,
            content: signatureContent
        });
        return await interaction.reply({
            content: "Die Signatur wurde erfolgreich geändert!",
            ephemeral: true
        }
        );
    }
}

export default modal;