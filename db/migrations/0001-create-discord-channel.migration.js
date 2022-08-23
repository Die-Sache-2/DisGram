'use strict';

const Sequelize = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.createTable('DiscordChannels', {
    id: {
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      type: Sequelize.UUID,
    },
    channelId: {
      type: Sequelize.STRING
    },
    channelName: {
      type: Sequelize.STRING
    },
    subscriptionIdentifier: {
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
  await queryInterface.dropTable('DiscordChannels');
}

module.exports = { up, down };
