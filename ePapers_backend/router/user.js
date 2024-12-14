const express = require("express");
const router = express.Router();
const crypter = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const connectDB = require("../database/dbconn");
const UserModel = require("../models/user");
const func = require("../assets/verifier");
connectDB();

router.get("/", (req, res) => {
  res.send("user");
});

router.post("/register", (req, res) => {
  UserModel.find({ email: req.body.email })
    .exec()
    .then((usr) => {
      if (usr.length >= 1) {
        return res.status(409).json({ message: "Mail Exists!" });
      } else {
        crypter.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(409).json({
              error: err,
              message: "Error",
              data: req.body.email,
            });
          } else {
            const User = new UserModel({
              _id: mongoose.Types.ObjectId(),
              name: req.body.name,
              email: req.body.email,
              password: hash,
              phoneNo: req.body.phoneNo
            });
            User.save()
              .then(() => {
                res.json({ message: "User Created" });
              })
              .catch((err) => {
                res.status(500).json({ error: err });
              });
          }
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({ error: err });
    });
});
// Sign In
router.post("/login", (req, res) => {
  UserModel.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(409).json({ message: "Auth Failed" });
      }
      crypter.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(409).json({ message: "Auth Failed" });
        }
        if (result) {
          const token = jwt.sign(
            {
              name: user[0].name,
              email: user[0].email,
              phoneNo: user[0].phoneNo,
              Id: user[0]._id,
              thirdParty: user[0].thirdParty,
            },
            process.env.THE_SECRET,
            {
              expiresIn: "1hr",
            }
          );
          return res
            .status(200)
            .json({ message: "Auth Success", token: token, uid: user[0]._id });
        }
        res.status(409).json({ message: "Auth Failed" });
      });
    })
    .catch((err) => {
      res.status(409).json({ error: err });
    });
});
// Delete User
router.delete("/delete", func, (req, res) => {
  UserModel.deleteOne({ _id: req.body.id })
    .exec()
    .then((user) => {
      res.status(200).json({ message: "Deleted Successfully" });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.post("/getdata", func, (req, res) => {
  UserModel.getOne({ email: req.body.email })
    .exec()
    .then((user) => {
      res.status(200).json({ user: user });
    });
});
// Update User
router.post("/update", func, (req, res) => {
  UserModel.findOneAndUpdate({ email: req.body.email }, { $set: req.body })
    .exec()
    .then((user) => {
      res.status(200).json({ message: "Updated Successfully", user });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
