'use strict';

const Sequelize = require('sequelize');

async function up({ context: queryInterface }) {
    await queryInterface.addColumn('Subscriptions', 'retentionTime', {
        type: Sequelize.DataTypes.INTEGER
    });
}

async function down({ context: queryInterface }) {
    await queryInterface.dropTable('Subscriptions');
}

module.exports = { up, down };