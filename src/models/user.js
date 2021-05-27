const {
  Model,
} = require('sequelize');

const bcrypt = require('bcrypt');

const PASSWORD_SALT_ROUNDS = 10;

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.post);
      this.hasMany(models.comment);
      this.belongsToMany(models.post, { through: models.like, as: 'interests' });
    }

    async checkPassword(password) {
      return bcrypt.compare(password, this.password);
    }

    getFullName() {
      return `${this.firstName} ${this.lastName}`;
    }
  }
  user.init({
    firstName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    lastName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    tag: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    picture: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
  }, {
    sequelize,
    modelName: 'user',
  });

  user.beforeSave(async (instance) => {
    if (instance.changed('password')) {
      const hash = await bcrypt.hash(instance.password, PASSWORD_SALT_ROUNDS);
      instance.set('password', hash);
    }
  });
  return user;
};
