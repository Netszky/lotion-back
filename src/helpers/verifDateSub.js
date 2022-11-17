const User = require("../models/users.model");
const Subscription = require("../models/subscription.model");

const verifDateSub = () => {
  User.find()
    .populate("subscription")
    .then((users) => {
      users.forEach(async (user) => {
        if (user.subscription?.cancel_date !== null || user.subscription?.cancel_date !== undefined) {
          console.log(user.email);
          if (new Date() >= user.subscription?.cancel_date) {
            console.log("email to delete", user.email);
            const exist = await Subscription.exists({ _id: user.subscription._id })
            if (exist) {
              await Subscription.findByIdAndDelete(user.subscription._id).then((data) => {
                console.log("user to delete", data)
                User.findByIdAndUpdate(user._id,
                  { isSub: false }, { new: true, omitUndefined: true }
                ).then((data) => console.log(data))
              }
              );
            }
          } else {
            console.log("SIIIIIIIIIOUF");
            return
          }
        } else {
          console.log("pas user");
          return
        }
      })
    });
};

module.exports = verifDateSub;
