import 'dotenv/config';
import { SlashCommandBuilder, Routes } from 'discord.js';
import { REST } from '@discordjs/rest';

const commands = [
    new SlashCommandBuilder().setName('disgram').setDescription('Replies disgram!')
        .addSubcommand(subcommand => subcommand.setName("set").setDescription("set").addStringOption("id"))
        .addSubcommand(subcommand => subcommand.setName("unset").setDescription("unset"))
]
    .map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN);

rest.put(Routes.applicationCommands(process.env.DISCORD_BOT_CLIENT_ID), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);