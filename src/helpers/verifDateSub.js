const User = require("../models/users.model");
const Subscription = require("../models/subscription.model");

const verifDateSub = () => {
  User.find()
    .populate("subscription")
    .then((users) => {
      users.forEach((user) => {
        if (new Date() >= user.subscription?.cancel_date) {
          console.log(user.email);
          Subscription.findByIdAndRemove(user.subscription._id);
          User.findByIdAndUpdate(user._id, { isSub: false });
        }
      });
    });
};

module.exports = verifDateSub;
