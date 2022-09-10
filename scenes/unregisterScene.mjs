import { Key, Keyboard } from "telegram-keyboard";
import { Scenes } from "telegraf";
import db from "../db/index.mjs";
import unsubscribeScene from "./unsubscribeScene.mjs";

const unregisterScene = new Scenes.BaseScene('UNREGISTER_SCENE_ID');

unregisterScene.enter(async ctx => {
    const keyboard = Keyboard.make([
        [Key.callback('Ja', 'unregisterStartAccept'), Key.callback('Nein', 'unregisterStartRefuse')]
    ]);

    await ctx.reply('Bist du dir sicher, dass du deine Registrierung aufheben möchtest?', keyboard.inline());
});

unregisterScene.action('unregisterStartAccept', async ctx => {
    await db.TelegramUser.destroy({
        where: {
            userId: ctx.session.data.userId
        }
    })
    await ctx.reply(`Die Registrierung des Nutzers ${ctx.session.data.name} wurde erfolgreich aufgehoben.`);
    await ctx.scene.leave();
});

unregisterScene.action('unregisterStartRefuse', async ctx => {
    await ctx.reply('Es wurde keine Registrierung aufgehoben.');
    return ctx.scene.leave();
});

export default unregisterScene;
