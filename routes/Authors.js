const express = require("express");
const AdminMiddleware = require("../auth/auth.admin");
const router = express.Router();

const {
  GetAllAuthors,
  CreateAuthor,
  editAuthor,
  RemoveAuthor,
  GetAuthor,
  GetAuthorBooks,
} = require("../controllers/AuthorController");

router.get("/", GetAllAuthors);
router.get("/search", GetAuthorBooks);
router.get("/:id", GetAuthor);
router.post("/", AdminMiddleware, CreateAuthor);
router.put("/:id", AdminMiddleware, editAuthor);
router.delete("/:id", AdminMiddleware, RemoveAuthor);
module.exports = router;
