import 'dotenv/config';
import { discordBot, telegramBot } from './bots/index.mjs';

await discordBot.login(process.env.DISCORD_BOT_TOKEN);
await telegramBot.launch();