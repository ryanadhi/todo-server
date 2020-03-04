'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Todos', [{
      title: 'trial',
      description: 'trial description',
      status : false,
      due_date : new Date (2020, 3 , 12),
      createdAt : new Date (),
      updatedAt : new Date ()
    },{
      title: 'trial2',
      description: 'trial2 description',
      status : false,
      due_date : new Date (2020, 4 , 12),
      createdAt : new Date (),
      updatedAt : new Date ()
    } ], {});
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Todos', null, {});
  }
};
