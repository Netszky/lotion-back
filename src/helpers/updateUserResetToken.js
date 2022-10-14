const User = require("../models/users.model");

const updateUserResetToken = (user, newToken) => {
  try {
    const userUpdate = User.findByIdAndUpdate(
      user._id,
      { resetToken: newToken },
      {
        new: true,
        omitUndefined: true,
      }
    );
    return userUpdate;
  } catch {
    return { message: "error update" };
  }
};

module.exports = updateUserResetToken;
