const { Sequelize, DataTypes } = require("sequelize");

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize("players", "sa", "kandari", {
  dialect: "mssql",
  host: "localhost",
  port: 1433,
  pool: { max: 5, min: 0, idle: 10000 },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(`error---${err}`);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./users")(sequelize, DataTypes);

//db.sequelize.sync({ force: true,match:/players$/ })           will delete table and create new table every time,and check condition
db.sequelize.sync().then(() => {
  console.log("sync db");
});
