module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("users", {
    name: {
      type: DataTypes.STRING,
      set(value) {
        this.setDataValue("name", value + "data");
      },
      get() {
        return this.getDataValue("name") + "xyz" + this.email;
      },
    },
    email: {
      type: DataTypes.STRING,
      defaultValue: "abc",
      set(value) {
        this.setDataValue("email", value + "@gamil.com");
      },
    },
    gender: DataTypes.STRING,
  });
  return Users;
};
