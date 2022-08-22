'use strict';

import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class DiscordChannel extends Model {
    static associate(models) {
      // define associations here
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