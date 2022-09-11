import { discordCommands } from '../../commands/index.mjs';
import modals from '../../modals/index.mjs';

let interactionCreate = async interaction => {
    if (interaction.type === 5) {
        let modal = modals.get(interaction.customId);
        return await modal.process(interaction);
    }

    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;
    if (commandName !== 'disgram') return;

    let command = discordCommands.get(interaction.options.getSubcommand());
    command.execute(interaction);
}

export default interactionCreate;