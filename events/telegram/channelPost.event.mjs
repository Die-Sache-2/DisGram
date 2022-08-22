import { telegramCommands } from '../../commands/index.mjs';

let channelPost = async ctx => {
    let channel_post = ctx.update.channel_post;
    if (!channel_post.text.startsWith("/disgram")) return;

    let [, commandName,] = channel_post.text.split(' ');

    let command = telegramCommands.get(commandName);
    command.execute(ctx);
}

export default channelPost;