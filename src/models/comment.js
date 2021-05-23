const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
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
  comment.init({
    content: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'comment',
  });
  return comment;
};
