import 'dotenv/config';
import { Client, GatewayIntentBits } from 'discord.js';
import db from './db/models/index.js';
import { Telegraf } from 'telegraf';

let discordBot = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
let telegramBot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

discordBot.on('interactionCreate', async interaction => {

    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;
    if (commandName === 'disgram') {
        if (interaction.options.getSubcommand("set")) {
            db.DiscordChannel.create({
                channelId: interaction.channelId,
                channelName: discordBot.channels.cache.get(interaction.channelId).name,
                subscriptionIdentifier: interaction.options.getSubcommand("set").getString()
            });
            await interaction.reply({
                content: interaction.options.getString("set"),
                ephemeral: true
            }
            );
        }
    }
});


telegramBot.on("channel_post", async ctx => {
    console.log(ctx.update.channel_post.text);
    let channel_post = ctx.update.channel_post
    if (channel_post.text.startsWith("/disgram ")) {
        let commandParts = channel_post.text.split(' ');
        if (commandParts[1] === "subscribe") {
            let telegramChannelId = ctx.update.channel_post.chat.id.toString();
            let subscriptionIdentifier = commandParts[2];
            await db.TelegramChannel.create({
                channelId: telegramChannelId,
                name: ctx.update.channel_post.chat.title
            });
            let telegramChannel = await db.TelegramChannel.findOne({
                where: {
                    channelId: telegramChannelId
                }
            });
            let discordChannel = await db.DiscordChannel.findOne({
                where: {
                    subscriptionIdentifier: subscriptionIdentifier
                }
            });
            db.Subscription.create({
                TelegramChannelId: telegramChannel.dataValues.id,
                DiscordChannelId: discordChannel.dataValues.id
            });
        }
    }
})

discordBot.on("messageCreate", async message => {
    let subscriptionPromise = await db.Subscription.findAll({
        include: [
            {
                model: db.DiscordChannel,
                attributes: ["channelId"]
            },
            {
                model: db.TelegramChannel,
                attributes: ["channelId"]
            },

        ]
    })

    let subscriptions = subscriptionPromise.map(it => it.dataValues).map(it => ({
        discordChannelId: it.DiscordChannel.dataValues.channelId,
        telegramChannelId: it.TelegramChannel.dataValues.channelId
    }));

    for (let subscription of subscriptions) {
        let { telegramChannelId, discordChannelId } = subscription;
        if (message.channelId === discordChannelId) {
            telegramBot.telegram.sendMessage(telegramChannelId, message.content);
        }
    }
})

telegramBot.command("disgram", ctx => {
    console.log("COMMAND");
    ctx.reply("Hi");
})

telegramBot.launch();
discordBot.login(process.env.DISCORD_BOT_TOKEN);


