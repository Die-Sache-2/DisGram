import 'dotenv/config';
import discordBot from './discord/index.mjs';
import telegramBot from './telegram/index.mjs';

import amqplib from 'amqplib';

await discordBot.login(process.env.DISCORD_BOT_TOKEN);
await telegramBot.launch();
/*
const queue = "tasks";
const conn = await amqplib.connect('amqp://rabbitmq:5672');
const ch1 = await conn.createChannel();
await ch1.assertQueue(queue);

// Sender
const ch2 = await conn.createChannel();

setInterval(() => {
    ch2.sendToQueue(queue, Buffer.from('something to do'));
}, 1000);

// Listener
await ch1.consume(queue, (msg) => {
    if (msg !== null) {
        console.log('Received:', msg.content.toString());
        ch1.ack(msg);
    } else {
        console.log('Consumer cancelled by server');
    }
});*/