'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class TelegramChannel extends Model {
    static associate(models) {
      // define associations here
    }
  }
  TelegramChannel.init({
    channelId: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TelegramChannel',
  });
  return TelegramChannel;
};