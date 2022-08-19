'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Subscriptions');
  }
};