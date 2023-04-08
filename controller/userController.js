const db = require("../models");
const Users = db.users;
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
module.exports = { addUser, crudOperation, query };
