import { validateTelegramRegistration } from "../../utils/Validations.mjs";

let unregister = {
    data: {
        name: 'unregister',
    },
    execute: async function (ctx) {
        if (!await validateTelegramRegistration(ctx.update.message.from.id.toString())) {
            return await ctx.reply(`Der Nutzer ${ctx.update.message.from.first_name} ist bereits nicht registriert.`);
        }
        ctx.session.data = {
            userId: ctx.update.message.from.id.toString(),
            name: ctx.update.message.from.first_name
        }
        return await ctx.scene.enter('UNREGISTER_SCENE_ID');
    }
}

export default unregister;