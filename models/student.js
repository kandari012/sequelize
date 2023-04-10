module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define(
    "student",
    {
      //name of table with s,es added
      name: DataTypes.STRING,
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
    },
    {
      tableName: "student", // will save created_at,updated_at and will check for foreign key user_id not userId
      underscored: true,
    }
  );
  return Student;
};

//paranoid and soft copy and transaction, hooks,query interface,migration,seeders
