import { Key, Keyboard } from "telegram-keyboard";
import { Scenes } from "telegraf";
import db from "../../db/index.mjs";

const registerScene = new Scenes.BaseScene('REGISTER_SCENE_ID');

registerScene.enter(async ctx => {
    const keyboard = Keyboard.make([
        [Key.callback('Ja', 'registerStartAccept'), Key.callback('Nein', 'registerStartRefuse')]
    ]);

    await ctx.reply('Möchtest du dich registrieren, um Discord Kanäle abonnieren zu können?', keyboard.inline());
});

registerScene.action('registerStartAccept', async ctx => {
    await ctx.scene.enter('TOKEN_WIZARD');
});

registerScene.action('registerStartRefuse', async ctx => {
    ctx.reply(`Es erfolgte keine Registrierung!`);
    await ctx.scene.leave();
})

const tokenWizard = new Scenes.WizardScene('TOKEN_WIZARD', async ctx => {
    await ctx.reply('Bitte gebe den Registrierungstoken ein.')
    return ctx.wizard.next();
},
    async ctx => {
        if (process.env.TELEGRAM_TOKEN !== ctx.message.text) {
            await ctx.reply("Ungültiger Token. Registrierung verweigert!");
            return ctx.scene.leave();
        }
        await createRegistration(ctx.session.data);
        await ctx.reply(`Der Nutzer ${ctx.update.message.from.first_name} wurde erfolgreich registriert!`);
        return await ctx.scene.leave();
    }
);

async function createRegistration({ userId, name }) {
    await db.TelegramUser.create({
        userId,
        name
    })
}

export default [registerScene, tokenWizard];
