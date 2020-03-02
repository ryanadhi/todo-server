'use strict';
module.exports = (sequelize, DataTypes) => {
  class Todo extends sequelize.Sequelize.Model{}
  Todo.init ({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: {
      type : DataTypes.BOOLEAN,
      defaultValue : false
    },
    due_date: {
      type : DataTypes.DATE,
      allowNull : false
    } 
  }, {
    validate : {
      titleIsNull (){
        if (!this.title){
          throw new Error('Title cannot be empty');
        }
      }
    },
    hooks : {
      beforeValidate: (todo, options) => {
        if (!todo.description){
          todo.description = todo.title
        }
      }
    },
    sequelize,
    modelName : 'Todo'
  })

  Todo.associate = function(models) {
    // associations can be defined here
  };
  return Todo;
};