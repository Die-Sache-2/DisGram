'use strict';

import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
    class Subscription extends Model {
        static associate(models) {
            this.belongsTo(models.DiscordChannel, {
                foreignKeyConstraint: true,
                onDelete: 'CASCADE'
            });
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