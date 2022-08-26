import {telegramCommands} from '../../commands/index.mjs';

let disgramCommand = async ctx => {
    let message = ctx.update.message.text;
    let [, commandName,] = message.split(' ');
    let command = telegramCommands.get(commandName);

    if(!commandName){
        ctx.reply(`Es wurde kein DisGram Befehl eingegeben.`);
        return;
    }
    if(!command){
        ctx.reply(`Der DisGram Befehl ${commandName} existiert nicht!` );
        return;
    }
    command.execute(ctx);
}

export default disgramCommand;
