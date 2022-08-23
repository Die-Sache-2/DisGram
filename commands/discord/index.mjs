import set from './set.command.mjs';
import unset from './unset.command.mjs';
import register from "./register.command.mjs";
import { Collection } from 'discord.js';

let commands = new Collection();
commands.set('set', set);
commands.set('unset', unset);
commands.set('register', register);
export default commands;