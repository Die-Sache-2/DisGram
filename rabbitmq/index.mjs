import amqplib from "amqplib";

const rabbitmq = await amqplib.connect('amqp://rabbitmq:5672');

export default rabbitmq;