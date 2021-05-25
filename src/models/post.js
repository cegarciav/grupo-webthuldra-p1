const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.user);
      this.hasMany(models.comment);
      this.belongsToMany(models.user, { through: models.like, as: 'likers' });
    }

    isLikedByUser(userId) {
      const likersIds = this.likers ? this.likers.map((liker) => liker.id) : [];
      return likersIds.includes(userId);
    }
  }
  post.init({
    caption: DataTypes.STRING,
    media: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
      },
    },
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'post',
  });
  return post;
};
