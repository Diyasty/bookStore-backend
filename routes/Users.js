const express = require("express");

const router = express.Router();

const AdminMiddleware = require("../auth/auth.admin");
const {
  GetAllUsers,
  editUser,
  RemoveUser,
  GetUser,
} = require("../controllers/UserController");

router.get("/", AdminMiddleware, GetAllUsers);
router.get("/:id", AdminMiddleware, GetUser);
router.put("/:id", AdminMiddleware, editUser);
router.delete("/:id", AdminMiddleware, RemoveUser);
module.exports = router;
