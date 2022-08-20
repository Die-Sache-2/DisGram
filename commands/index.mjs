import set from './set.mjs';
import unset from './unset.mjs';
import { Collection } from 'discord.js';

let commands = new Collection();
commands.set('set', set);
commands.set('unset', unset);
export default commands;