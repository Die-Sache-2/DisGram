import db from '../../db/index.mjs';
import {markdownv2 as format} from "telegram-format";
import rabbitmq from "../../rabbitmq/index.mjs";

let ch = await rabbitmq.createChannel();
for(let i = 0; i<0; i++)
setInterval(
    () => {
        ch.sendToQueue("task", Buffer.from("Hallo"));
    }, 0
)

let messageCreate = async message => {
    let channel = await rabbitmq.createChannel();
    channel.sendToQueue("task", Buffer.from(await appendSignature(format.escape(message.content))), {
        headers: {
            channelId: message.channelId
        }
    });
}

async function appendSignature(content) {
    let signature = (await db.Signature.findAll())[0]?.dataValues?.content;
    return content + (signature ? '\n\n' + signature : '');
}

export default messageCreate;