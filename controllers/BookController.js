const path = require("path");

const bookModel = require("../model/Book");
async function GetAllBooks(req, res) {
  await bookModel
    .find({}, (err, books) => {
      if (err) res.status(500).send(err);
      res.status(200).json({
        massage: "success",
        data: books,
      });
    })
    .populate("author", "-books")
    .populate("genre", "-books");
}
function GetBook(req, res) {
  const id = req.params.id;
  bookModel
    .findById({ _id: id })
    .exec()
    .then((doc) => {
      res.status(201).json({
        massage: "Get Book  successfully",
        result: doc,
      });
    });
}
/**
 * @prams
 * @body
 */
async function CreateBook(req, res) {
  if (!req.file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    res.send("file format not valid,please upload a valid image format");
  }

  data = {
    isbn: req.body.isbn,
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
    genre: req.body.genre,
    price: req.body.price,
    sale: req.body.sale,
    image: `http://localhost:3000/uploads/${req.file.filename}`,
  };
  let NewBook = await new bookModel(data);
  // save the book
  delete NewBook.sale;
  await NewBook.save().then((doc) => {
    res.status(201).json(doc);
  });
}
async function editBook(req, res) {
  const { title } = req.body;
  const id = req.params.id;
  bookModel
    .findByIdAndUpdate({ _id: id }, { title: title })
    .then(async (result) => {
      await bookModel.findById({ _id: id }).then((doc) => {
        res.status(201).json({
          massage: "Book edited successfully",
          result: doc,
        });
      });
    })
    .catch((err) => console.log(err));
}
async function RemoveBook(req, res) {
  const id = req.params.id;
  await bookModel
    .findByIdAndRemove({ _id: id })
    .then((result) => {
      res.status(201).json({
        massage: "Book Removed successfully",
        result: result,
      });
    })
    .catch((err) => console.log(err));
}

async function GetBookByTitle(req, res) {
  const query = req.query;
  await bookModel
    .find({
      title: new RegExp(query.title, "i"),
    })
    .exec(function (err, docs) {
      res.send(docs);
    });
}
module.exports = {
  GetAllBooks,
  CreateBook,
  editBook,
  RemoveBook,
  GetBook,
  GetBookByTitle,
};
