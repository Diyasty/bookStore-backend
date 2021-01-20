const router = require("express").Router();
const { registerValidate, loginValidate } = require("../ValidationError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * @import UserModel;
 */
const UserModel = require("../model/User");
const { use } = require("bcrypt/promises");
/**
 * @Register Method :  creat new user;
 * @body {
 *  email:string,
 *   password: string,
 *  isAdmin: boolean
 * }
 */
router.post("/register", async (req, res, next) => {
  // Get req body
  let body = req.body;
  // check if email is already exits in db
  UserModel.findOne({ email: body.email }, async (err, userExits) => {
    if (!userExits) {
      const { error } = registerValidate(body);
      if (error) {
        res.status(405).json({
          message: error,
        });
      } else {
        const user = new UserModel(body);
        await user.save((err, result) => {
          if (err) {
            res.send(err);
          }
          const token = jwt.sign(
            {
              email: result.email,
              userId: result._id,
              isAdmin: result.isAdmin,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "24h",
            }
          );

          res.status(201).json({
            message: "User created successfully ... ",
            user: {
              id: result._id,
              email: result.email,
              token: token,
            },
          });
        });
      }
    } else {
      res.status(400).send({
        message: `${body.email} is already exits`,
      });
    }
  });
});

/**
 * @Login  Method :   user log in ;
 * @body {
 *  email:string,
 *   password: string,
 *  isAdmin: boolean
 * }
 */

router.post("/login", async (req, res) => {
  let body = req.body;
  // check if email is already exits
  const user = await UserModel.findOne({
    email: body.email,
  });

  if (user) {
    await bcrypt.compare(body.password, user.password, (err, result) => {
      if (!result) {
        res.status(401).json({
          message: "email or password invalid",
        });
      } else {
        //  cerate token
        const token = jwt.sign(
          {
            email: user.email,
            id: user._id,
            isAdmin: user.isAdmin,
          },
          process.env.JWT_KEY,
          {
            expiresIn: "1h",
          }
        );
        res.status(200).json({
          user: {
            email: user.email,
            id: user._id,
            isAdmin: user.isAdmin,
            token,
          },
        });
      }
    });
  } else {
    res.status(401).json({
      message: "email or password invalid",
    });
  }
  // await UserModel.findOne(
  //   {
  //     email: body.email,
  //   },
  //   async (result) => {
  //     if (!result) {
  //       res.status(401).json({ err: "err" });
  //     } else {
  //       //compare password
  //       await bcrypt.compare(
  //         String(body.password),
  //         String(result.password),
  //         (err, user) => {
  //           if (err)
  //             res.status(401).json({
  //               message: "email or password Not Valid",
  //             });
  //           if (user) {
  //             // create token and payload
  //             const token = jwt.sign(
  //               {
  //                 email: result.email,
  //                 userId: result._id,
  //                 isAdmin: result.isAdmin,
  //               },
  //               process.env.JWT_KEY,
  //               {
  //                 expiresIn: "1h",
  //               }
  //             );
  //             res.status(200).json({
  //               message: "Auth successful",
  //               user: {
  //                 email: result.email,
  //                 userId: result._id,
  //                 token: token,
  //               },
  //             });
  //           } else {
  //             res.status(401).json({
  //               message: "email or password Not Valid",
  //             });
  //           }
  //         }
  //       );
  //     }
  //   }
  // );
});

module.exports = router;
