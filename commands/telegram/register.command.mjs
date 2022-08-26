import db from '../../db/index.mjs';
import parseCommand from "minimist";
import validateCommandOptions from "./utils/Validations.mjs";

let register = {
    data: {
        name: 'register',
        options: ['_'],
        mandatory: ['token']
    },
    execute: async function (ctx) {
        let command = ctx.update.channel_post ?? ctx.update.message;
        let commandOptions = parseCommand(command.text.split(' ').slice(2));
        if (!await validateCommandOptions(this, commandOptions, ctx)) return;

        if (commandOptions.token !== process.env.TOKEN) {
            await ctx.reply("Ungültiger Token. Registrierung verweigert!");
            return;
        }

       let userCount =  await db.TelegramUser.count({
            where: {
                userId: ctx.update.message.from.id.toString()
            }
        })

        if(userCount){
            await ctx.reply(`Der Nutzer ${ctx.update.message.from.first_name} ist bereits registriert!`);
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