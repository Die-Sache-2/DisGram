import db from "../../db/index.mjs";

export default async function validatePrivileges(message){
    let userCount = await db.DiscordUser.count({
        where: {
            userId: message.author?.id?.toString() ?? message.user.id.toString()
        }
    })
   return Boolean(userCount) || message?.options?.getSubcommand() === 'register';
}