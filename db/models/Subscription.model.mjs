'use strict';

import Sequelize, { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
    class Subscription extends Model {
        static associate(models) {
            this.belongsTo(models.DiscordChannel, {
                foreignKeyConstraint: true,
                onDelete: 'CASCADE'
            });
            this.belongsTo(models.TelegramChannel);
            this.belongsTo(models.TelegramUser, {
                foreignKeyConstraint: true,
                onDelete: 'CASCADE'
            });
        }
    }
    Subscription.init({
        id: {
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            type: Sequelize.UUID,
        },
        retentionTime: {
            type: Sequelize.INTEGER
        }
    }, {
        sequelize,
        modelName: 'Subscription',
    });
    return Subscription;
};