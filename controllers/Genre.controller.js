const GenreModel = require("../model/Genre");
function GetAllGenre(req, res) {
  GenreModel.find({}, (err, Genres) => {
    if (err) console.log(err);
    res.status(200).json({
      data: Genres,
    });
  }).populate("books", "");
}
function GetGenre(req, res) {
  const id = req.params.id;
  GenreModel.findById({ _id: id })
    .exec()
    .then((doc) => {
      res.status(201).json(doc);
    });
}

async function CreateGenre(req, res) {
  const data = req.body;

  let NewGenre = new GenreModel(data);
  await NewGenre.save()
    .then((doc) => {
      res.status(201).json(doc);
    })
    .catch((err) => {
      console.error(err);
      res.status(404).json(err.errors);
    });
}
function editGenre(req, res) {
  const { title } = req.body;
  const id = req.params.id;
  GenreModel.findByIdAndUpdate({ _id: id }, { title: title })
    .then((result) => {
      GenreModel.findById({ _id: id }).then((doc) => {
        res.status(201).json({
          massage: "Genre edited successfully",
          result: doc,
        });
      });
    })
    .catch((err) => console.log(err));
}
function RemoveGenre(req, res) {
  const id = req.params.id;
  GenreModel.findByIdAndRemove({ _id: id })
    .then((result) => {
      res.status(201).json({
        massage: "Genre Removed successfully",
        result: result,
      });
    })
    .catch((err) => console.log(err));
}
async function GetGenreBooks(req, res) {
  const query = req.query;
  await GenreModel.find({
    name: new RegExp(query.name, "i"),
  }).exec(function (err, docs) {
    res.send(docs);
  });
}

module.exports = {
  GetAllGenre,
  CreateGenre,
  editGenre,
  RemoveGenre,
  GetGenre,
  GetGenreBooks,
};
