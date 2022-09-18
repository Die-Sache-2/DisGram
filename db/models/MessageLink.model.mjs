'use strict';

import Sequelize, {Model} from 'sequelize';

export default (sequelize, DataTypes) => {
    class MessageLink extends Model {
        static associate(models) {
            this.belongsTo(models.Subscription, {
                foreignKeyConstraint: true,
                onDelete: 'CASCADE'
            });
        }
    }

    MessageLink.init({
        id: {
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            type: Sequelize.UUID,
        },
        discordMessageId: DataTypes.STRING,
        telegramMessageId: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'MessageLink',
    });
    return MessageLink;
};