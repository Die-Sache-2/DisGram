'use strict';

import Sequelize, { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class DiscordChannel extends Model {
    static associate(models) {

    }
  }
  DiscordChannel.init({
    id: {
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      type: Sequelize.UUID,
    },
    channelId: DataTypes.STRING,
    channelName: DataTypes.STRING,
    subscriptionIdentifier: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DiscordChannel',
  });
  return DiscordChannel;
};