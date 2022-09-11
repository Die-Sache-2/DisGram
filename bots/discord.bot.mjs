import { Client, GatewayIntentBits } from 'discord.js';
import { discordEvents } from '../events/index.mjs';

let discordBot = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
discordBot.on('interactionCreate', discordEvents.interactionCreate);
discordBot.on("messageCreate", discordEvents.messageCreate);

export default discordBot;
