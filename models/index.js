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
db.tags = require("./tags")(sequelize, DataTypes);
db.post_tags = require("./post_tags")(sequelize, DataTypes);

//===----------------------------scope-----------------------------------------------------
db.users.addScope("includePost", {
  include: {
    model: db.posts,
    as: "postDetails",
  },
});
db.users.addScope("selectUser", {
  attributes: ["name"],
});

// db.users.hasOne(db.posts, { foreignKey: "user_id", as: "postDetails" }); //userId
db.users.hasMany(db.posts, { foreignKey: "user_id", as: "postDetails" }); //userId
db.posts.belongsTo(db.users.scope("selectUser"), { foreignKey: "user_id" });

// many to many
db.posts.belongsToMany(db.tags, { through: "post_tag" });
db.tags.belongsToMany(db.posts, { through: "post_tag" });

//-------------------------one to many polymorphic----------------------------------

db.video = require("./video")(sequelize, DataTypes);
db.image = require("./image")(sequelize, DataTypes);
db.comment = require("./comment")(sequelize, DataTypes);

db.image.hasMany(db.comment, {
  foreignKey: "commentableId",
  constraints: false,
  scope: {
    commentableType: "image",
  },
});

db.video.hasMany(db.comment, {
  foreignKey: "commentableId",
  constraints: false,
  scope: {
    commentableType: "video",
  },
});

db.comment.belongsTo(db.image, {
  foreignKey: "commentableId",
  constraints: false,
});

db.comment.belongsTo(db.video, {
  foreignKey: "commentableId",
  constraints: false,
});

//--------------------polymorphic many to many----------------------------------------

//  video,image,tag,tag_taggable
db.tag_taggable = require("./tag_taggable")(sequelize, DataTypes);

// --------------------image to tag----------------------
db.image.belongsToMany(db.tags, {
  through: {
    model: db.tag_taggable,
    unique: false,
    scope: {
      taggableType: "image",
    },
  },
  foreignKey: "taggableId",
  constraints: false,
});

//------------------------tag to image-----------------------------------

db.tags.belongsToMany(db.image, {
  through: {
    model: db.tag_taggable,
    unique: false,
    scope: {
      taggableType: "image",
    },
  },
  foreignKey: "tagId",
  constraints: false,
});

//--------------------------video to tag-----------------------------------

db.video.belongsToMany(db.tags, {
  through: {
    model: db.tag_taggable,
    unique: false,
    scope: {
      taggableType: "video",
    },
  },
  foreignKey: "taggableId",
  constraints: false,
});

//-----------------------------tag to video ---------------------------------

db.tags.belongsToMany(db.video, {
  through: {
    model: db.tag_taggable,
    unique: false,
    scope: {
      taggableType: "video",
    },
  },
  foreignKey: "tagId",
  constraints: false,
});

module.exports = db;
