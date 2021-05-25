const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.user);
      this.belongsTo(models.post);
    }
  }
  like.init({
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'like',
  });
  return like;
};
