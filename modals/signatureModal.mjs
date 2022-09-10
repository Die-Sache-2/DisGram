import {ActionRowBuilder, ModalBuilder, TextInputBuilder} from 'discord.js';

const modal = new ModalBuilder()
    .setCustomId('signatureModal')
    .setTitle('Erstelle Signatur');

const signatureInput = new TextInputBuilder()
    .setCustomId('signatureInput')
    .setLabel("Gebe hier die gewünschte Signatur ein!")
    .setStyle("Paragraph");

const signatureActionRow = new ActionRowBuilder().addComponents(signatureInput);

// Add inputs to the modal
modal.addComponents(signatureActionRow);



export default modal;