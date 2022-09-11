import { Scenes } from "telegraf";
import subscribeScenes from "./subscribeScene.mjs";
import unsubscribeScene from "./unsubscribeScene.mjs";
import registerScenes from "./registerScene.mjs";
import unregisterScene from "./unregisterScene.mjs";

const stage = new Scenes.Stage([...subscribeScenes, unsubscribeScene, ...registerScenes, unregisterScene]);

export default stage;