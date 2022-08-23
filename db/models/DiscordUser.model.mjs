'use strict';

import Sequelize, { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
    class DiscordUser extends Model {
        static associate(models) {

        }
    }
    DiscordUser.init({
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
        modelName: 'DiscordUser',
    });
    return DiscordUser;
};