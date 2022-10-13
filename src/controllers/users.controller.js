const User = require("../models/users.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const configs = require("../configs/jwt.configs");

exports.create = (req, res) => {
  let hasedPassword = bcrypt.hashSync(req.body.password, 10);
  const user = new User({
    lastName: req.body.lastname,
    firstName: req.body.firstname,
    email: req.body.email,
    password: hasedPassword,
    subscription: null,
  });
  user
    .save()
    .then((data) => {
      let userToken = jwt.sign(
        {
          id: data._id,
          auth: true,
        },
        configs.jwt.secret,
        {
          expiresIn: 86400,
        }
      );
      res.send({
        token: userToken,
        auth: true,
      });
    })
    .catch((err) => {
      res.status(500).send({
        error: 500,
        message: err.message || "Vous avez une erreur",
      });
    });
};
exports.login = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      let passwordValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordValid) {
        return res.status(401).send({
          message: "password not valid",
          auth: false,
          token: null,
        });
      } else {
        let userToken = jwt.sign(
          {
            id: user._id,
            isAdmin: user.isAdmin,
          },
          configs.jwt.secret,
          {
            expiresIn: 86400,
          }
        );
        res.status(200).send({
          auth: true,
          token: userToken,
          isAdmin: user.isAdmin,
        });
      }
    })
    .catch((err) => {
      res.status(404).send(err);
    });
};

exports.findEmail = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user != null) {
        res.status(200).send({
          getMail: true,
        });
      } else {
        res.status(200).send({
          getMail: false,
        });
      }
    })
    .catch((err) => {
      res.status(404).send({
        getMail: false,
      });
    });
};

exports.findOne = (req, res) => {
  User.findById(req.user.id)
    .then((user) => {
      if (!user) {
        res.status(404).send({
          message: `Votre User id ${req.user.id} n'a pas été trouvé`,
        });
      }
      return res.send(user);
    })
    .catch((err) => res.send(err));
};

exports.getUserAll = (req, res) => {
  User.find()
    .then((Users) => {
      res.status(200).json(Users);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
  })
    .then((data) => {
      res.send({ user: data });
    })
    .catch((err) => res.status(500).json({ err: err }));
};

exports.deleteUser = (req, res, next) => {
  User.deleteOne({ _id: req.user.id })
    .then(() => {
      res.status(200).json({
        message: "Utilisateur supprimé",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
