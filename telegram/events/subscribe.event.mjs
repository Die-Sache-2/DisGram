import telegramBot from "../index.mjs";
import { validateTelegramRegistration } from "../../utils/Validations.mjs";

let subscribe = async ctx => {
    if (!await validateTelegramRegistration(ctx.update.message.from.id.toString())) {
        return ctx.reply('Ich kann kein Abonnement zu einem Discord Kanal herstellen, da dir die Berechtigungen fehlen. Bitte registriere dich mit "/register" und besorge den erforderlichen Registrierungstoken von einem Administrator.');
    }
    try {
        let botInfo = await telegramBot.telegram.getChatMember(ctx.update.message.forward_from_chat.id, ctx.botInfo.id);
        if (botInfo.status !== 'administrator') {
            return ctx.reply('Ich bin in diesem Kanal kein Mitglied. Füge mich diesem Kanal als Administrator hinzu, wenn ich Discord Kanäle abonnieren soll.');
        }
    } catch (error) {
        return ctx.reply('Ich bin in diesem Kanal kein Administrator. Füge mich diesem Kanal als Administrator hinzu, wenn ich Discord Kanäle abonnieren soll.');
    }

    ctx.session.data = {
        telegramChannelId: ctx.update.message.forward_from_chat.id,
        telegramChannelName: ctx.update.message.forward_from_chat.title,
        userId: ctx.message.from.id
    }
    await ctx.scene.enter('SUBSCRIBE_SCENE_ID');
}

export default subscribe;
