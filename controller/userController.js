const db = require("../models");
const Users = db.users;

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
module.exports = { addUser };
