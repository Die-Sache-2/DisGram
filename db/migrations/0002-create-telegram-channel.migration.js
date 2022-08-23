'use strict';

const Sequelize = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.createTable('TelegramChannels', {
    id: {
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      type: Sequelize.UUID,
    },
    channelId: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
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
  await queryInterface.dropTable('TelegramChannels');
}

module.exports = { up, down };