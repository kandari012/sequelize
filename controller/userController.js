const db = require("../models");
const Users = db.users;
const Posts = db.posts;
const Tags = db.tags;
const Post_Tags = db.post_tags;
const Image = db.image;
const Video = db.video;
const Comment = db.comment;
const { Sequelize, Op } = require("sequelize");

var addUser = async (req, res) => {
  let data = await Users.create({ name: "rk", email: "aa", gender: "male" });
  console.log(data.dataValues);

  // update data
  data.name = "rk3";
  data.save();
  // delete data
  data.destroy();
  let response = {
    data: "OK",
  };

  res.status(200).json(response);
};

var crudOperation = async (req, res) => {
  // insert

  // let data = await Users.create({
  //   name: "rahul",
  //   email: "gmail",
  //   gender: "male",
  // });
  // console.log(data.id);

  // will insert only name and gender
  // let data = await Users.create(
  //   { name: "rk", email: "aa", gender: "male" },
  //   { fields: ["name", "gender"] }
  // );

  //bulk create

  // let data = await Users.bulkCreate([
  //   { name: "rk6", email: "aa6", gender: "male" },
  //   { name: "rk7", email: "aa7", gender: "male" },
  //   { name: "rk8", email: "aa8", gender: "male" },
  // ]);

  // find
  // let data=await Users.findOne({});
  // let data = await Users.findAll({});
  // update

  // let data = await Users.update(
  //   { email: "@gamail" },
  //   { where: { name: "rk3" } }
  // );

  //delete
  // let data = await Users.destroy({ where: { id: 2 } });

  let response = {
    data: data,
  };

  res.status(200).json(response);
};
//  attributes will only give perticular field
var query = async (req, res) => {
  //
  // let data = await Users.findAll({
  //   attributes: [
  //     "name",
  //     ["email", "emailID"],
  //     // [Sequelize.fn("CONCAT", Sequelize.col("email")), "emailCount"],
  //   ],
  // });

  let data = await Users.findAll({
    where: {
      id: { [Op.gt]: 1 },
    },
    order: [["name", "DESC"]], // order by
    // group: ["email"],
    limit: 2, // limit
    offset: 1, //skip first 1
  });

  // will exclude fields
  // let data = await Users.findAll({
  //   attributes: { exclude: ["createdAt", "email"] },
  // });

  let response = {
    data: data,
  };

  res.status(200).json(response);
};

var setterGetter = async (req, res) => {
  // finders from docs

  // let data = await Users.create({ name: "vikas", email: "aa", gender: "male" });
  let data = await Users.findAll({});
  let response = {
    data: data,
  };

  res.status(200).json(response);
};

var oneToOne = async (req, res) => {
  let data = await Users.findAll({
    attributes: ["email", "name", "user_id"],
    //left outer join
    include: [
      {
        model: Posts,
        as: "postDetails",
        attributes: ["title", "name"],
      },
    ],
    where: { user_id: 2 },
  });

  // get all user belong to post
  let data2 = await Posts.findAll({
    //left outer join
    include: [
      {
        model: Users,
      },
    ],
  });

  let response = {
    data: data2,
  };

  res.status(200).json(response);
};

var oneToMany = async (req, res) => {
  let data = await Users.findAll({
    attributes: ["email", "name", "user_id"],
    //left outer join
    include: [
      {
        model: Posts,
        as: "postDetails",
        attributes: ["title", "name"],
      },
    ],
  });

  let response = {
    data: data,
  };

  res.status(200).json(response);
};

var manyToMany = async (req, res) => {
  let data = await Posts.findAll({
    //left outer join
    include: [
      {
        model: Tags,
      },
    ],
  });

  let data2 = await Tags.findAll({
    //left outer join
    include: [
      {
        model: Posts,
      },
    ],
  });
  let response = {
    data: data2,
  };

  res.status(200).json(response);
};

var polymorphicOneToMany = async (req, res) => {
  // image to comment----
  let data = await Image.findAll({
    //left outer join
    include: [
      {
        model: Comment,
      },
    ],
  });

  // video to comment----
  let data2 = await Video.findAll({
    //left outer join
    include: [
      {
        model: Comment,
      },
    ],
  });

  // comment to video----
  let data3 = await Comment.findAll({
    //left outer join
    include: [Video],
  });

  let response = {
    data: data3,
  };

  res.status(200).json(response);
};
module.exports = {
  addUser,
  crudOperation,
  query,
  setterGetter,
  oneToOne,
  oneToMany,
  manyToMany,
  polymorphicOneToMany,
};
