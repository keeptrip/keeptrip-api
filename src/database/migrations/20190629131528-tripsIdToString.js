/* eslint-disable */
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.changeColumn('trips', 'id', {
      type: Sequelize.STRING(50),
      allowNull: false,
      primaryKey: true,
      defaultValue: null,
    }),

  down: (queryInterface, Sequelize) =>
    queryInterface.changeColumn('trips', 'id', {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.fn('uuid_generate_v4'),
    }),
}
