const User = require("../models/users.model");
const Subscription = require("../models/subscription.model");

const verifDateSub = () => {
  User.find()
    .populate("subscription")
    .then((users) => {
      users.forEach( (user) => {
         if (user.subscription !== null) {
             console.log("je suis user = ",user)
             if(user.subscription.cancel_date !== null) {
                console.log(user.email);
                if (new Date() >= user.subscription.cancel_date) {
                    console.log("email to delete", user.email);
                    const exist = Subscription.exists({ _id: user.subscription._id })
                    if (exist) {
                        Subscription.findByIdAndDelete(user.subscription._id).then((data) => {
                                console.log("user to delete", data)
                                User.findByIdAndUpdate(user._id,
                                    { subscription:null,isSub: true }, { new: true, omitUndefined: true }
                                ).then((data) => console.log(data))
                            }
                        );
                    } else {
                        console.log("not exist")
                    }
               } else {
                 console.log("SIIIIIIIIIOUF");
                 return
               }
             } else {
                 console.log("pas de cancel date")
                 return
             }

         } else {
           console.log("pas subscription");
          return
         }
      })
    });
};

module.exports = verifDateSub;
