import 'dotenv/config';
import { discordBot, telegramBot } from './bots/index.mjs';
import { discordEvents, telegramEvents } from './events/index.mjs';
import session from '@telegraf/session';
import stage from './scenes/index.mjs';
import telegramCommands from './commands/telegram/index.mjs';

discordBot.on('interactionCreate', discordEvents.interactionCreate);
discordBot.on("messageCreate", discordEvents.messageCreate);
await discordBot.login(process.env.DISCORD_BOT_TOKEN);

telegramBot.use(session());
telegramBot.use(stage.middleware());

telegramBot.on("channel_post", telegramEvents.channelPost);
telegramBot.on("forward_date", telegramEvents.subscribe);
telegramCommands.forEach((command, name) => {
    telegramBot.command(name, command.execute);
})

await telegramBot.launch();