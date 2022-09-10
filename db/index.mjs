'use strict';

import DiscordChannel from './models/DiscordChannel.model.mjs';
import TelegramChannel from './models/TelegramChannel.model.mjs';
import Subscription from './models/Subscription.model.mjs';
import DiscordUser from './models/DiscordUser.model.mjs';
import TelegramUser from './models/TelegramUser.model.mjs';
import Signature from './models/Signature.model.mjs';
import Sequelize from 'sequelize';
import { Umzug, SequelizeStorage } from 'umzug';

const db = {};

let sequelize = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres'
});

const umzug = new Umzug({
  migrations: { glob: 'db/migrations/*.js' },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

await umzug.up();

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.DiscordChannel = DiscordChannel(sequelize, Sequelize.DataTypes);
db.TelegramChannel = TelegramChannel(sequelize, Sequelize.DataTypes);
db.Subscription = Subscription(sequelize, Sequelize.DataTypes);
db.DiscordUser = DiscordUser(sequelize, Sequelize.DataTypes);
db.TelegramUser = TelegramUser(sequelize, Sequelize.DataTypes);
db.Signature = Signature(sequelize, Sequelize.DataTypes);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export default db;