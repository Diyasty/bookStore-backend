const express = require("express");
const router = express.Router();
const UserMiddleware = require("../auth/auth.middleware");
const AdminMiddleware = require("../auth/auth.admin");

const {
  CreateOrder,
  editOrder,
  RemoveOrder,
  GetOrder,
} = require("../controllers/OrderController");

router.get("/:id", UserMiddleware, GetOrder);
router.post("/", UserMiddleware, CreateOrder);
router.put("/:id", AdminMiddleware, editOrder);
router.delete("/:id", AdminMiddleware, RemoveOrder);
module.exports = router;
