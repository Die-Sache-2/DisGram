import { discordCommands } from '../../commands/index.mjs';
import db from "../../db/index.mjs";
import validatePrivileges from "./Validation.mjs";
let interactionCreate = async interaction => {
    if(!(await validatePrivileges(interaction))){
        await interaction.reply({
                content: "Fehlende Berechtigung!",
                ephemeral: true
            }
        );
        return;
    }
   if (interaction.type === 5) {
       const signatureContent = interaction.fields.getTextInputValue('signatureInput');
       let signatureId = (await db.Signature.findAll())[0]?.dataValues?.id;
       await db.Signature.upsert({
           id: signatureId,
           content: signatureContent
       });
       return  await interaction.reply({
               content: "Die Signatur wurde erfolgreich geändert!",
               ephemeral: true
           }
       );;
   }

    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;
    if (commandName !== 'disgram') return;

    let command = discordCommands.get(interaction.options.getSubcommand());
    command.execute(interaction);
}

export default interactionCreate;