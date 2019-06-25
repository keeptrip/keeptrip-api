/* eslint-disable */
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('trips', 'description', {
      type: Sequelize.TEXT
    }),

  down: (queryInterface, Sequelize) => 
    queryInterface.removeColumn('trips', 'description')
}
