import amqplib from "amqplib";

const rabbitmq = await amqplib.connect(`amqp://${process.env.RABBITMQ_HOST ?? 'localhost'}:5672`);

export default rabbitmq;