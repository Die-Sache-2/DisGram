import {Key, Keyboard} from "telegram-keyboard";
import {Scenes} from "telegraf";
import db from "../db/index.mjs";

const unsubscribeScene = new Scenes.BaseScene('UNSUBSCRIBE_SCENE_ID');

unsubscribeScene.enter(async ctx => {
    const keyboard = Keyboard.make([
        [Key.callback('Ja', 'unsubscribeStartAccept'), Key.callback('Nein', 'unsubscribeStartRefuse')]
    ]);

    await ctx.reply('Möchtest du ein Discord Abonnement aufheben?', keyboard.inline());
});

unsubscribeScene.action('unsubscribeStartAccept', async ctx => {
    let user = (await db.TelegramUser.findOne({
        where: {
            userId: ctx.session.data.userId.toString()
        }
    })).dataValues;

    ctx.session.data.user = user;

    let telegramChannels = (await db.TelegramChannel.findAll({
        include: [{
            model: db.Subscription,
            where: {
                TelegramUserId: user.id
            },
            required: true
        }]
    })).map(it => it.dataValues);

    if(!telegramChannels.length){
        await ctx.reply('Du hast keinen Telegram Kanal mit einem aktiven Abonnement.');
        return;
    }

    ctx.session.data.telegramChannels = telegramChannels;

    let channelKeys = telegramChannels.map(it =>
        Key.callback(it.name, 'unsubscribe_telegram_' + it.name)
    )

    ctx.editMessageReplyMarkup({
        reply_markup: {remove_keyboard: true}
    })

    const keyboard = Keyboard.make([
        channelKeys
    ]);
    await ctx.reply('Für welchen Telegram Kanal möchtest du ein Abonnement aufheben?', keyboard.inline());
})

unsubscribeScene.action('unsubscribeStartRefuse', async ctx => {
    await ctx.reply('Es wurde kein Discord Kanal deabonniert.');
    return ctx.scene.leave();
});

unsubscribeScene.action(/unsubscribe_telegram_(.*)/, async ctx => {
    const telegramChannel = ctx.session.data.telegramChannels.find(it => it.name === ctx.match[1]);
    let subscriptions = (await db.Subscription.findAll({
        where: {
            TelegramUserId: ctx.session.data.user.id,
            TelegramChannelId: telegramChannel.id

        },
        include: [db.DiscordChannel]
    })).map(it => it.dataValues);

    ctx.session.data.subscriptions = subscriptions;

    let channelKeys = subscriptions.map(it =>
        Key.callback(it.DiscordChannel.dataValues.subscriptionIdentifier, 'unsubscribe_discord_' + it.DiscordChannel.dataValues.subscriptionIdentifier)
    )
    ctx.editMessageReplyMarkup({
        reply_markup: {remove_keyboard: true}
    })
    const keyboard = Keyboard.make([
        channelKeys
    ]);
    await ctx.reply('Welchen Discord Kanal möchtest du deabonnieren?', keyboard.inline());
});

unsubscribeScene.action(/unsubscribe_discord_(.*)/, async ctx => {
    const subscription = ctx.session.data.subscriptions.find(it => it.DiscordChannel.dataValues.subscriptionIdentifier === ctx.match[1]);
    await db.Subscription.destroy({
        where: {
            TelegramChannelId: subscription.TelegramChannelId,
            DiscordChannelId: subscription.DiscordChannelId,
            TelegramUserId: ctx.session.data.user.id
        }
    });
    await ctx.reply(`Der Discord Kanal ${ctx.match[1]} wurde erfolgreich deabonniert.`);
});

export default unsubscribeScene;
