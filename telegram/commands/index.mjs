import unsubscribe from './unsubscribe.command.mjs';
import register from './register.command.mjs';
import unregister from "./unregister.command.mjs";

let commands = new Map();
commands.set(unsubscribe.data.name, unsubscribe);
commands.set(register.data.name, register);
commands.set(unregister.data.name, unregister);
export default commands;