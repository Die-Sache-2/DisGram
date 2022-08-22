'use strict';

const Sequelize = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.createTable('Subscriptions', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    DiscordChannelId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'DiscordChannels',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    TelegramChannelId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'TelegramChannels',
        key: 'id',
      },
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

async function down({ context: queryInterface }) {
  await queryInterface.dropTable('Subscriptions');
}

module.exports = { up, down };