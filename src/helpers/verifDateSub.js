const User = require("../models/users.model");
const Subscription = require("../models/subscription.model");

const verifDateSub = () => {
  User.find()
    .populate("subscription")
    .then((users) => {
      users.forEach((user) => {
        console.log(user.subscription);
        if (new Date() >= user.subscription?.cancel_date) {
          Subscription.findByIdAndRemove(user.subscription._id);
          User.findByIdAndUpdate(user._id, { isSub: false });
        }
      });
    });
};

module.exports = verifDateSub;
