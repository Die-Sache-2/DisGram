import { Scenes } from "telegraf";
import subscribeScenes from "./subscribe.scene.mjs";
import unsubscribeScene from "./unsubscribe.scene.mjs";
import registerScenes from "./register.scene.mjs";
import unregisterScene from "./unregister.scene.mjs";

const stage = new Scenes.Stage([...subscribeScenes, unsubscribeScene, ...registerScenes, unregisterScene]);

export default stage;