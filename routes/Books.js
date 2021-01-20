const express = require("express");
const AdminMiddleware = require("../auth/auth.admin");
const UserMiddleware = require("../auth/auth.middleware");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10000000000000,
  },
});

const {
  GetAllBooks,
  CreateBook,
  editBook,
  RemoveBook,
  GetBook,
  GetBookByTitle,
} = require("../controllers/BookController");

router.get("/", GetAllBooks);
router.get("/search", GetBookByTitle);
router.get("/:id", GetBook);
router.post("/", upload.single("image"), AdminMiddleware, CreateBook);
router.put("/:id", AdminMiddleware, editBook);
router.delete("/:id", AdminMiddleware, RemoveBook);
module.exports = router;
