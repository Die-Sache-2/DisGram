'use strict';

import Sequelize, { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
    class Signature extends Model {
        static associate(models) {
            this.belongsTo(models.DiscordUser);
        }
    }

    Signature.init({
        id: {
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            type: Sequelize.UUID,
        },
        content: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Signature',
    });
    return Signature;
};