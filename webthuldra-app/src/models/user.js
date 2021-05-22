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

    getFullName() {
      return `${this.firstName} ${this.lastName}`;
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
        isEmail: true,
        notEmpty: true
      }
    },
    tag: {
      type: DataTypes.STRING,
      defaultValue: ""
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: ""
    },
    picture: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      }
    }
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};