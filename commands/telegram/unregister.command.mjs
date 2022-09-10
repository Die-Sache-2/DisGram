import parseCommand from "minimist";
import validateCommandOptions from "./utils/Validations.mjs";

let unregister = {
    data: {
        name: 'unregister',
        options: ['_'],
        mandatory: []
    },
    execute: async function (ctx) {
        let command = ctx.update.channel_post ?? ctx.update.message;
        let commandOptions = parseCommand(command.text.split(' ').slice(2));

        if (!await validateCommandOptions(this, commandOptions, ctx)) return;


        ctx.session.data = {
            userId: ctx.update.message.from.id.toString(),
            name: ctx.update.message.from.first_name
        }
        return await ctx.scene.enter('UNREGISTER_SCENE_ID');
    }
}

export default unregister;