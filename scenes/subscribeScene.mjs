import {Key, Keyboard} from "telegram-keyboard";
import {Scenes} from "telegraf";
import db from "../db/index.mjs";

const subscribeScene = new Scenes.BaseScene('SUBSCRIBE_SCENE_ID');

subscribeScene.enter(async ctx => {
    const keyboard = Keyboard.make([
        [Key.callback('Ja', 'subscribeStartAccept'), Key.callback('Nein', 'subscribeStartRefuse')]
    ]);

    await ctx.reply('Möchtest du einen Discord Kanal abonnieren?', keyboard.inline());
});

subscribeScene.action('subscribeStartAccept', async ctx => {
    let channelKeys = (await db.DiscordChannel.findAll()).map(it => it.dataValues).map(it =>
        Key.callback(it.subscriptionIdentifier, 'subscribe_' + it.subscriptionIdentifier)
    )
    ctx.editMessageReplyMarkup({
        reply_markup: {remove_keyboard: true}
    })
    const keyboard = Keyboard.make([
        channelKeys
    ]);
    await ctx.reply('Welchen Discord Kanal möchtest du abonnieren?', keyboard.inline())
});

subscribeScene.action('subscribeStartRefuse', async ctx => {
    await ctx.reply('Es wurde kein Discord Kanal abonniert.');
    await ctx.scene.leave();
})

subscribeScene.action(/subscribe_(.*)/, async ctx => {
    ctx.session.data.discordChannelName = ctx.match[1];
    const keyboard = Keyboard.make([
        [Key.callback('Ja', 'subscribeRetentionAccept'), Key.callback('Nein', 'subscribeRetentionRefuse')]
    ]);
    await ctx.reply('Möchtest du die Aufbewahrungszeit der abonnierten Nachrichten begrenzen?', keyboard.inline())
})

subscribeScene.action('subscribeRetentionAccept', async ctx => {
    await ctx.scene.enter('RETENTION_WIZARD');
})

subscribeScene.action('subscribeRetentionRefuse', async ctx => {
    await createSubscription(ctx.session.data);
    ctx.reply(`Es wurde der Discord Kanal "${ctx.session.data.discordChannelName}" abonniert.`);
    await ctx.scene.leave();
})

const retentionWizard = new Scenes.WizardScene('RETENTION_WIZARD', async ctx => {
        await ctx.reply('Bitte gebe eine Aufbewahrungszeit in Minuten an.')
        return ctx.wizard.next();
    },
    async ctx => {
        ctx.session.data.retentionTime = ctx.message.text;
        await createSubscription(ctx.session.data);

        await ctx.reply(`Dieser Kanal hat nun den Discord Kanal ${ctx.session.data.discordChannelName} abonniert!`);
        await ctx.scene.leave();
    }
);

const stage = new Scenes.Stage([subscribeScene, retentionWizard]);

async function createSubscription({telegramChannelId, discordChannelName, userId, telegramChannelName, retentionTime}) {
    let channelCount = await db.TelegramChannel.count({
        where: {
            channelId: telegramChannelId.toString()
        }
    })
    if (!channelCount) {
        await db.TelegramChannel.create({
            channelId: telegramChannelId.toString(),
            name: telegramChannelName
        });
    }
    let telegramChannel = await db.TelegramChannel.findOne({
        where: {
            channelId: telegramChannelId.toString()
        }
    });
    let discordChannel = await db.DiscordChannel.findOne({
        where: {
            subscriptionIdentifier: discordChannelName
        }
    });
    let user = await db.TelegramUser.findOne({
        where: {
            userId: userId.toString()
        }
    });
    await db.Subscription.create({
        TelegramChannelId: telegramChannel.dataValues.id,
        DiscordChannelId: discordChannel.dataValues.id,
        TelegramUserId: user.dataValues.id,
        retentionTime: Number(retentionTime)
    });
}

export default stage;
