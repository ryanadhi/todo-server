'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Todos', 'urlImage', Sequelize.STRING);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn ('Todos', 'urlImage')
  }
};
