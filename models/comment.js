module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("comment", {
    title: DataTypes.STRING,
    commentableType: DataTypes.STRING,
    commentableId: DataTypes.INTEGER,
  });
  return Comment;
};
