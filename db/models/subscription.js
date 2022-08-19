'use strict';
const {
    Model
} = require('sequelize');
const { DiscordChannel } = require('./discordchannel.js');
module.exports = (sequelize, DataTypes) => {
    class Subscription extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.DiscordChannel);
            this.belongsTo(models.TelegramChannel);
        }
    }
    Subscription.init({

    }, {
        sequelize,
        modelName: 'Subscription',
    });
    return Subscription;
};