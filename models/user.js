'use strict';
const { hashPassword } = require ('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model{}

  User.init({
    email: {
      type : DataTypes.STRING,
      allowNull : false,
      unique : true,
      validate : {
        isEmail : {
          args : true,
          msg : 'Email is not valid'
        },
        notNull : {
          args : true,
          msg : 'Email cannot be empty'
        }
      }
    },
    password: {
      type :DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          args : true,
          msg : 'Password cannot be empty'
        },
        len : {
          args : [6],
          msg : 'Password at least 6 characters'
        }
      }
    }
  },{
    hooks : {
      beforeCreate: (user, options) => {
        user.password = hashPassword (user.password)
      }
    },
    sequelize,
    modelName : 'User'
  })

  User.associate = function(models) {
    User.hasMany(models.Todo)
  };
  return User;
};