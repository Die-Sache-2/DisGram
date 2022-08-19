import Sequelize from "sequelize";
import DiscordChannel from "./models/DiscordChannel.model.mjs";

const sequelize = new Sequelize(process.env.DATABASE_URL);
const db = {};

db.Sequelize = Sequelize;

db.DiscordChannel = DiscordChannel;

export default db;