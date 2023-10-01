import 'dotenv/config';
import { SlashCommandBuilder, Routes } from 'discord.js';
import { REST } from '@discordjs/rest';

const commands = [
    new SlashCommandBuilder().setName('disgram').setDescription('Replies disgram!')
        .addSubcommand(subcommand => subcommand.setName("set").setDescription("set").addStringOption(option => option.setName("id").setDescription("Set subsciption identifier")))
        .addSubcommand(subcommand => subcommand.setName("unset").setDescription("unset"))
        .addSubcommand(subcommand => subcommand.setName("register").setDescription("Registriere Nutzer").addStringOption(option => option.setName("token").setDescription("Zugangstoken")))
        .addSubcommand(subcommand => subcommand.setName("unregister").setDescription("Hebe die Registrierung deines Nutzers auf."))
        .addSubcommand(subcommand => subcommand.setName("signature").setDescription("Erstelle Signatur"))
]
    .map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN);

rest.put(Routes.applicationCommands(process.env.DISCORD_BOT_CLIENT_ID), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);