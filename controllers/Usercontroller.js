const UserModel = require("../model/User");
function GetAllUsers(req, res) {
  console.log("1111");
  UserModel.find({}, (err, Users) => {
    if (err) console.log(err);
    res.status(200).json({
      massage: "Done",
      data: Users,
    });
  });
}
function GetUser(req, res) {
  const id = req.params.id;
  UserModel.findById({ _id: id }).then((doc) => {
    res.status(201).json({
      massage: "Get User  successfully",
      result: doc,
    });
  });
}

function editUser(req, res) {
  const { title } = req.body;
  const id = req.params.id;
  UserModel.findByIdAndUpdate({ _id: id }, { title: title })
    .then((result) => {
      UserModel.findById({ _id: id }).then((doc) => {
        res.status(201).json({
          massage: "User edited successfully",
          result: doc,
        });
      });
    })
    .catch((err) => console.log(err));
}
function RemoveUser(req, res) {
  const id = req.params.id;
  UserModel.findByIdAndRemove({ _id: id })
    .then((result) => {
      res.status(201).json({
        massage: "User Removed successfully",
        result: result,
      });
    })
    .catch((err) => console.log(err));
}
module.exports = {
  GetAllUsers,
  editUser,
  RemoveUser,
  GetUser,
};
