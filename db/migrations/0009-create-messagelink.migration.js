'use strict';

const Sequelize = require('sequelize');

async function up({context: queryInterface}) {
    await queryInterface.createTable('MessageLinks', {
        id: {
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            type: Sequelize.UUID,
        },
        discordMessageId: {
            type: Sequelize.STRING,
        },
        telegramMessageId: {
            type: Sequelize.STRING,
        },
        SubscriptionId: {
            type: Sequelize.DataTypes.UUID,
            references: {
                model: 'Subscriptions',
                key: 'id',
            }
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        }
    });
}

async function down({context: queryInterface}) {
    await queryInterface.dropTable('MessageLink');
}

module.exports = {up, down};