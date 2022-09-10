import modal from "../../modals/signatureModal.mjs";
let signature = {
    execute: async interaction => {
            await interaction.showModal(modal);
        }
}

export default signature;
