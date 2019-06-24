/* eslint-disable */
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";').then(function() {
      return queryInterface.createTable('trips', {
        id: {
          field: 'id',
          type: Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
          defaultValue: Sequelize.fn('uuid_generate_v4'),
        },
        title: {
          field: 'title',
          type: Sequelize.STRING(255)
        },
        createdAt: {
          field: 'created_at',
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn('now'),
        },
        updatedAt: {
          field: 'updated_at',
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn('now'),
        },
      })
    })
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.dropTable('trips')
  }
};
