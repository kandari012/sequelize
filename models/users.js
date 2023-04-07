module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("users", {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      defaultValue: "abc",
    },
    gender: DataTypes.STRING,
  });
  return Users;
};
