import {Scenes} from "telegraf";
import subscribeScenes from "./subscribeScene.mjs";
import unsubscribeScene from "./unsubscribeScene.mjs";
import registerScene from "./registerScene.mjs";
import unregisterScene from "./unregisterScene.mjs";

const stage = new Scenes.Stage([...subscribeScenes, unsubscribeScene, ...registerScene, unregisterScene]);

export default stage;