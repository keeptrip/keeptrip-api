/* eslint-disable */
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    .then(() => queryInterface.createTable('trips', {
      id: {
        type: Sequelize.STRING(50),
        allowNull: false,
        primaryKey: true,
        defaultValue: null,
      },
      title: {
        type: Sequelize.STRING(255)
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
    })),

  down: (queryInterface, Sequelize) => 
    queryInterface.dropTable('trips')
}
