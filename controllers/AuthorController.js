const AuthorModel = require("../model/Author");
function GetAllAuthors(req, res) {
  AuthorModel.find({}, (err, Authors) => {
    if (err) console.log(err);
    res.status(200).json(Authors);
  }).populate("books");
}
function GetAuthor(req, res) {
  const id = req.params.id;
  AuthorModel.findById({ _id: id })
    .exec()
    .then((doc) => {
      res.status(201).json(doc);
    });
}

async function CreateAuthor(req, res) {
  const data = req.body;

  let NewAuthor = new AuthorModel(data);
  await NewAuthor.save()
    .then((doc) => {
      res.status(201).json(doc);
    })
    .catch((err) => {
      console.error(err);
      res.status(404).json(err.errors);
    });
}
function editAuthor(req, res) {
  const { title } = req.body;
  const id = req.params.id;
  AuthorModel.findByIdAndUpdate({ _id: id }, { title: title })
    .then((result) => {
      AuthorModel.findById({ _id: id }).then((doc) => {
        res.status(201).json({
          massage: "Author edited successfully",
          result: doc,
        });
      });
    })
    .catch((err) => console.log(err));
}
function RemoveAuthor(req, res) {
  const id = req.params.id;
  AuthorModel.findByIdAndRemove({ _id: id })
    .then((result) => {
      res.status(201).json({
        massage: "Author Removed successfully",
        result: result,
      });
    })
    .catch((err) => console.log(err));
}
async function GetAuthorBooks(req, res) {
  const query = req.query;
  await AuthorModel.find({
    name: new RegExp(query.name, "i"),
  }).exec(function (err, docs) {
    res.send(docs);
  });
}

module.exports = {
  GetAllAuthors,
  CreateAuthor,
  editAuthor,
  RemoveAuthor,
  GetAuthor,
  GetAuthorBooks,
};
