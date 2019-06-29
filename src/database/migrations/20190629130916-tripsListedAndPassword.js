/* eslint-disable */
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn('trips', 'listed', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }),

    queryInterface.addColumn('trips', 'password', {
      type: Sequelize.STRING(255)
    }),
  ]),

  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.removeColumn('trips', 'listed'),
    queryInterface.removeColumn('trips', 'password')
  ])
}
