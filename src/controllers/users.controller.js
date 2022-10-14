const User = require("../models/users.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const configs = require("../configs/jwt.configs");
const Dossier = require('../models/dossier.model');
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
      const dossierCorbeille = new Dossier({
        name: "Corbeille",
        level: 1,
        user: data._id,
        parent: null
      }).save()
      const dossierArchive = new Dossier({
        name: "Archive",
        level: 1,
        user: data._id,
        parent: null
      }).save()
      const dossierBrouillon = new Dossier({
        name: "Brouillon",
        level: 1,
        user: data._id,
        parent: null
      }).save()

      let userToken = jwt.sign(
        {
          user: user,
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
        user: user
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
          status: 401
        });
      }
      if (user === null || undefined) {
        return res.status(401).send({
          message: "user not valid",
          auth: false,
          token: null,
          status: 401
        });
      }
      else {
        let userToken = jwt.sign(
          {
            user: user,
            isAdmin: user.isAdmin,
          },
          configs.jwt.secret,
          {
            expiresIn: 86400,
          }
        );
        res.status(200).send({
          user: user,
          auth: true,
          token: userToken,
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
          updatePassword: true
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
      verify: true
    })
  } else {
    res.status(401).send({
      verify: false
    })
  };
};
