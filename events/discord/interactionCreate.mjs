import { discordCommands } from '../../commands/index.mjs';

let interactionCreate = async interaction => {
    if (!interaction.isChatInputCommand()) return;
    const { commandName } = interaction;
    if (commandName !== 'disgram') return;

    let command = discordCommands.get(interaction.options.getSubcommand());
    command.execute(interaction);
}

export default interactionCreate;