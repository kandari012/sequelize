const { Sequelize, DataTypes } = require("sequelize");

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize("players", "sa", "kandari", {
  dialect: "mssql",
  host: "localhost",
  port: 1433,
  // logging: false, //  will not log any query on console
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

//db.sequelize.sync({ force: true,match:/players$/ })           will delete table and create new table every time,and check condition
db.sequelize.sync().then(() => {
  console.log("sync db");
});

db.users = require("./users")(sequelize, DataTypes);
db.posts = require("./posts")(sequelize, DataTypes);

db.users.hasOne(db.posts, { foreignKey: "user_id", as: "postDetails" }); //userId
db.posts.belongsTo(db.users);
module.exports = db;
