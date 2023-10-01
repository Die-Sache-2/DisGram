import set from './set.command.mjs';
import unset from './unset.command.mjs';
import register from "./register.command.mjs";
import { Collection } from 'discord.js';
import signature from "./signature.command.mjs";
import unregister from './unregister.command.mjs';

let commands = new Collection();
commands.set('set', set);
commands.set('unset', unset);
commands.set('register', register);
commands.set('unregister', unregister);
commands.set('signature', signature);
export default commands;