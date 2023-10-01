import 'dotenv/config';
import discordBot from './discord/index.mjs';
import telegramBot from './telegram/index.mjs';

await discordBot.login(process.env.DISCORD_BOT_TOKEN);
await telegramBot.launch();