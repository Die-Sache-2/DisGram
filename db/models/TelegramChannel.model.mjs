'use strict';
import Sequelize, {Model} from 'sequelize';

export default (sequelize, DataTypes) => {
    class TelegramChannel extends Model {
        static associate(models) {
            this.hasMany(models.Subscription)
        }
    }

    TelegramChannel.init({
        id: {
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            type: Sequelize.UUID,
        },
        channelId: DataTypes.STRING,
        name: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'TelegramChannel',
    });
    return TelegramChannel;
};