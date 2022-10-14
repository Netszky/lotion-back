const User = require("../models/users.model");

const updateUserResetToken = (user, newToken) => {
  console.log("Je suis user dans updateUserResetToken = ", user);
  console.log("Je suis newToken = ", newToken);
  User.findByIdAndUpdate(
    user._id,
    { resetToken: newToken },
    {
      new: true,
      omitUndefined: true
    }
  )
    .then((data) => {
      res.send({ user: data });
    })
    .catch((err) => res.status(500).json({ err: err }));
};

module.exports = updateUserResetToken;
