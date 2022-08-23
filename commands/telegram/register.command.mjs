import db from '../../db/index.mjs';

let register = {
    execute: async (ctx) => {
        let command = ctx.update.channel_post ?? ctx.update.message;

        let [, , token] = command.text.split(' ');
        if(token !== process.env.TOKEN){
            await ctx.reply("Ungültiger Token. Registrierung verweigert!");
            return;
        }

        await db.TelegramUser.create({
            userId: ctx.update.message.from.id,
            name: ctx.update.message.from.first_name
        })

        await ctx.reply(`Der Nutzer ${ctx.update.message.from.first_name} wurde erfolgreich registriert!`);
    }
}

export default register;