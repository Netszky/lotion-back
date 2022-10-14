const sendEmail = require("../helpers/sendEmail");
const findByEmail = require("../helpers/findEmail");
const updateUserResetToken = require("../helpers/updateUserResetToken");

const jwt = require("jsonwebtoken");
const configs = require("../configs/jwt.configs");

const NewToken = (user) => {
  let newToken = jwt.sign(
    {
      id: user._id,
    },
    configs.jwt.secret,
    {
      expiresIn: 600,
    }
  );
  return newToken;
};

exports.resetPassword = (req, res) => {
  findByEmail(req.body.email)
    .then((user) => {
      const token = NewToken(user);
      updateUserResetToken(user, token)
        .then((newUser) => {
          const email = sendEmail(newUser, token, 4276684, "Réinitialisation");
          if (email.message === "Email Send") {
            res.status(200).send({
              status: 200,
              message: email.message,
            });
          } else {
            res.status(500).send({
              status: 500,
              message: email.message,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
