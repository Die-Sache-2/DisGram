import db from "../../db/index.mjs";

let forwardDate = async ctx => {
    let userCount = await db.TelegramUser.count({
        where: {
            userId: ctx.update.message.from.id.toString()
        }
    })

    if (!userCount) {
        ctx.reply('Ich kann kein Abonnement zu einem Discord Kanal herstellen, da dir die Berechtigungen fehlen. Bitte registriere dich mit "/disgram register <TOKEN>" und besorge den Token von einem Administrator.');
        return;
    }
    ctx.session.data = {
        telegramChannelId: ctx.update.message.forward_from_chat.id,
        telegramChannelName: ctx.update.message.forward_from_chat.title,
        userId: ctx.message.from.id
    }
    await ctx.scene.enter('SUBSCRIBE_SCENE_ID');
}

export default forwardDate;
