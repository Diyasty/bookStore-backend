const OrderModel = require("../model/Order");
const Books = require("../model/Book");
function GetOrder(req, res) {
  const id = req.params.id;
  OrderModel.findById({ _id: id })
    .populate("book", "")
    .then((doc) => {
      if (!doc) res.send("Not Exits");

      res.status(201).json(doc);
    })
    .catch((Err) => res.send(Err));
}

async function CreateOrder(req, res) {
  const data = req.body;

  let NewOrder = new OrderModel(data);
  //   let NewOrder = new OrderModel({ isbn, title, description, author, Category });
  await NewOrder.save()
    .then((doc) => {
      res.status(201).json(doc);
    })
    .catch((err) => {
      console.error(err);
      res.status(404).json(err.errors.title.message);
    });
}
function editOrder(req, res) {
  const { title } = req.body;
  const id = req.params.id;
  OrderModel.findByIdAndUpdate({ _id: id }, { title: title })
    .then((result) => {
      OrderModel.findById({ _id: id }).then((doc) => {
        res.status(201).json({
          massage: "Order edited successfully",
          result: doc,
        });
      });
    })
    .catch((err) => console.log(err));
}
function RemoveOrder(req, res) {
  const id = req.params.id;
  OrderModel.findByIdAndRemove({ _id: id })
    .then((result) => {
      res.status(201).json({
        massage: "Order Removed successfully",
        result: result,
      });
    })
    .catch((err) => console.log(err));
}
module.exports = {
  CreateOrder,
  editOrder,
  RemoveOrder,
  GetOrder,
};
