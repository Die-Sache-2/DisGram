'use strict';

const Sequelize = require('sequelize');

async function up({ context: queryInterface }) {
    await queryInterface.addColumn('Subscriptions', 'DiscordChannelId', {
        type: Sequelize.DataTypes.UUID,
        references: {
            model: 'DiscordChannels',
            key: 'id',
        },
        onDelete: 'CASCADE',
    });

    await queryInterface.addColumn('Subscriptions', 'TelegramChannelId', {
        type: Sequelize.DataTypes.UUID,
        references: {
            model: 'TelegramChannels',
            key: 'id',
        },
    });

    await queryInterface.addColumn('Subscriptions', 'TelegramUserId', {
        type: Sequelize.DataTypes.UUID,
        references: {
            model: 'TelegramUsers',
            key: 'id',
        },
    });
}

async function down({ context: queryInterface }) {
    await queryInterface.dropTable('Subscriptions');
}

module.exports = { up, down };