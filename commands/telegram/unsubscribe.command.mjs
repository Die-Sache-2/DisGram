import { validateTelegramRegistration } from "../../utils/Validations.mjs";

let unsubscribe = {
    data: {
        name: 'unsubscribe'
    },
    execute: async function (ctx) {
        if (!await validateTelegramRegistration(ctx.update.message.from.id.toString())) {
            return await ctx.reply('Fehlende Berechtigung!');
        }
        ctx.session.data = {
            userId: ctx.update.message.from.id
        };
        return await ctx.scene.enter('UNSUBSCRIBE_SCENE_ID');
    }
}

export default unsubscribe;