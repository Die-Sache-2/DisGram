import set from './set.command.mjs';
import unset from './unset.command.mjs';
import { Collection } from 'discord.js';

let commands = new Collection();
commands.set('set', set);
commands.set('unset', unset);
export default commands;