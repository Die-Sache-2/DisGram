'use strict';

import DiscordChannel from './DiscordChannel.model.mjs';
import TelegramChannel from './TelegramChannel.model.mjs';
import Subscription from './Subscription.model.mjs';
import Sequelize from 'sequelize';

const env = process.env.NODE_ENV || 'development';
const db = {};

let sequelize = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
  host: 'db',
  dialect: 'postgres'
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.DiscordChannel = DiscordChannel(sequelize, Sequelize.DataTypes);
db.TelegramChannel = TelegramChannel(sequelize, Sequelize.DataTypes);
db.Subscription = Subscription(sequelize, Sequelize.DataTypes);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export default db;