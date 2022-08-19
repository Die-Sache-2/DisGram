'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DiscordChannel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

    }
  }
  DiscordChannel.init({
    channelId: DataTypes.STRING,
    channelName: DataTypes.STRING,
    subscriptionIdentifier: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DiscordChannel',
  });
  return DiscordChannel;
};