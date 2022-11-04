const User = require("../models/users.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const configs = require("../configs/jwt.configs");
const Dossier = require("../models/dossier.model");
const sendEmail = require("../helpers/sendEmail");

exports.create = (req, res) => {
  let hasedPassword = bcrypt.hashSync(req.body.password, 10);
  const user = new User({
    lastname: req.body.lastname,
    firstname: req.body.firstname,
    email: req.body.email,
    password: hasedPassword,
    subscription: null,
  });

  user
    .save()
    .then((data) => {
      let userToken = jwt.sign(
        {
          user: { userId: user._id, userName: user.firstname, userLastName: user.lastname },
          auth: true,
        },
        configs.jwt.secret,
        {
          expiresIn: 86400,
        }
      );
      const email = sendEmail(user, userToken, 4278254, "Bienvenue");
      if (email.message === "Email Send") {
        res.status(200).send({
          auth: true,
          token: userToken,
          user: { userId: user._id, userName: user.firstname, userLastName: user.lastname },
          isAdmin: user.isAdmin,
        });
      } else {
        res.status(500).send({
          status: 500,
          message: email.message,
        });
      }
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
          status: 401,
        });
      }
      if (user === null || undefined) {
        return res.status(401).send({
          message: "user not valid",
          auth: false,
          token: null,
          status: 401,
        });
      } else {
        let userToken = jwt.sign(
          {
            user: { userId: user._id, userName: user.firstname, userLastName: user.lastname },
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
          user: { userId: user._id, userName: user.firstname, userLastName: user.lastname },
          isAdmin: user.isAdmin,
        });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
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
  //Via middleware
  User.findById(req.user.user.userId).populate("subscription")
    .then((user) => {
      if (!user) {
        res.status(500).send({
          message: `Votre User id ${req.user.id} n'a pas été trouvé`,
        });
      }
      return res.status(200).send(user);
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
  User.findByIdAndUpdate(req.user.user.userId, req.body, {
    new: true,
  })
    .then((data) => {
      res.send({ userId: data._id, userName: data.lastname, userLastName: data.firstname });
    })
    .catch((err) => res.status(500).json({ err: err }));
};

exports.updatePassword = (req, res) => {
  if (req.body.password) {
    const hasedPassword = bcrypt.hashSync(req.body.password, 10);
    User.findOneAndUpdate(
      { resetToken: req.body.token },
      { password: hasedPassword },
      {
        new: true,
        omitUndefined: true,
      }
    )
      .then(() => {
        res.status(201).send({
          updatePassword: true,
        });
      })
      .catch((err) => res.status(500).json({ err: err }));
  }
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

exports.verifyToken = (req, res) => {
  if (req.user) {
    res.status(200).send({
      verify: true,
    });
  } else {
    res.status(401).send({
      verify: false,
    });
  }
};
