import subscribe from './subscribe.command.mjs';
import unsubscribe from './unsubscribe.command.mjs';
import { Collection } from 'discord.js';

let commands = new Collection();
commands.set('subscribe', subscribe);
commands.set('unsubscribe', unsubscribe);

export default commands;