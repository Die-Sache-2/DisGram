import { Client, GatewayIntentBits } from 'discord.js';

let discordBot = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

export default discordBot;
