const Sequelize = require("sequelize");

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
