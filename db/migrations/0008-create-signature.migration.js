'use strict';

const Sequelize = require('sequelize');

async function up({ context: queryInterface }) {
    await queryInterface.createTable('Signatures', {
        id: {
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            type: Sequelize.UUID,
        },
        content: {
            type: Sequelize.STRING,
        },
        DiscordUserId: {
            type: Sequelize.DataTypes.UUID,
            references: {
                model: 'DiscordUsers',
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
    await queryInterface.dropTable('Signatures');
}

module.exports = { up, down };