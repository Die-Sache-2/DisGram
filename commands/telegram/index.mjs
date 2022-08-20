import subscribe from './subscribe.mjs';
import unsubscribe from './unsubscribe.mjs';
import { Collection } from 'discord.js';

let commands = new Collection();
commands.set('subscribe', subscribe);
commands.set('unsubscribe', unsubscribe);

export default commands;