const User = require("../models/users.model");

const findByEmail = (email) => {
  const user = User.findOne({ email: email });
  try {
    return user;
  } catch {
    return { message: "Error, not user" };
  }
};

module.exports = findByEmail;
