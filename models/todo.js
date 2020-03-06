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
    due_date: DataTypes.DATE,
    UserId : DataTypes.INTEGER,
    urlImage : DataTypes.STRING
  }, {
    validate : {
      titleIsNull (){
        if (!this.title){
          throw new Error('Title cannot be empty');
        }
      },
      checkDueDate (){
        if (!this.due_date){
          throw new Error('Due Date cannot be empty');
        } else {
          if (new Date(this.due_date) < new Date()){
            throw new Error('You must select date in the future');
          }
        }
      }
    },
    sequelize,
    modelName : 'Todo'
  })

  Todo.associate = function(models) {
    Todo.belongsTo(models.User)
  };
  return Todo;
};