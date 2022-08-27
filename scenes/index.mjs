import {Scenes} from "telegraf";
import subscribeScenes from "./subscribeScene.mjs";
import unsubscribeScene from "./unsubscribeScene.mjs";

const stage = new Scenes.Stage([...subscribeScenes, unsubscribeScene]);

export default stage;