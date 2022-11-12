const User = require("../models/users.model");
const Subscription = require("../models/subscription.model");

const verifDateSub = () => {
  User.find()
    .populate("Subscription")
    .then((users) => {
      users.forEach((user) => {
        if (new Date() >= user.subscription.cancel_date) {
          Subscription.findByIdAndRemove(user.subscription);
          User.findByIdAndUpdate(user._id, { isSub: false });
        }
      });
    });
};

module.exports = verifDateSub;