'use strict';

import Sequelize, { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
    class TelegramUser extends Model {
        static associate(models) {
            this.hasMany(models.Subscription);
        }
    }
    TelegramUser.init({
        id: {
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            type: Sequelize.UUID,
        },
        userId: DataTypes.STRING,
        name: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'TelegramUser',
    });
    return TelegramUser;
};