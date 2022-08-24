import db from "../../../db/index.mjs";

export default async function validateCommandOptions(command, commandOptions, ctx) {
    for (let commandOption in commandOptions) {
        if (!command.data.options.includes(commandOption) && !command.data.mandatory.includes(commandOption)) {
            ctx.reply(`Ungültige Option ${commandOption}`)
            return false;
        }
    }

    for (let mandatoryOption of command.data.mandatory) {
        if (!commandOptions.hasOwnProperty(mandatoryOption)) {
            ctx.reply(`Option ${mandatoryOption} ist verpflichtend`)
            return false;
        }
    }

    let userCount = await db.TelegramUser.count({
        where: {
            userId: ctx.update.message.from.id.toString()
        }
    })

    if (!userCount) {
        ctx.reply('Fehlende Berechtigungen für diesen Befehl!');
        return false;
    }
    return true;
}