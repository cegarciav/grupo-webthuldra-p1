'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.post)
    }
  };
  user.init({
    firstName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    lastName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    tag: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING
    },
    picture: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    }
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};