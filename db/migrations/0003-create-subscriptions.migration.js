'use strict';

const Sequelize = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.createTable('Subscriptions', {
    id: {
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      type: Sequelize.UUID,
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