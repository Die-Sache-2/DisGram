import 'dotenv/config';
import {discordBot, telegramBot} from './bots/index.mjs';
import {discordEvents, telegramEvents} from './events/index.mjs';

discordBot.on('interactionCreate', discordEvents.interactionCreate);
discordBot.on("messageCreate", discordEvents.messageCreate);
await discordBot.login(process.env.DISCORD_BOT_TOKEN);

telegramBot.on("channel_post", telegramEvents.channelPost)
telegramBot.command("disgram", telegramEvents.disgramCommand);
await telegramBot.launch();