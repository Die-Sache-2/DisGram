import subscribe from './subscribe.command.mjs';
import unsubscribe from './unsubscribe.command.mjs';
import register from './register.command.mjs';
import { Collection } from 'discord.js';

let commands = new Collection();
commands.set('subscribe', subscribe);
commands.set('unsubscribe', unsubscribe);
commands.set('register', register);

export default commands;