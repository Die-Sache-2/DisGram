import {telegramCommands} from '../../commands/index.mjs';

let disgramCommand = async ctx => {
    let message = ctx.update.message.text;

    let [, commandName,] = message.split(' ');

    let command = telegramCommands.get(commandName);
    command.execute(ctx);
    ctx.reply("Der angegebene Kanal hat nun den gewünschten Discord Kanal abonniert!");
}

export default disgramCommand;
