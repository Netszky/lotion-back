const config = require("../configs/stripe.configs");
const stripe = require("stripe")(config.stripe.key);
const User = require("../models/users.model");
const Subscription = require("../models/subscription.model");
// const mailjet = require("../services/mailjet.service");

const webhookSecret = config.stripe.webhook_secret;

exports.stripewebhook = (req, res) => {
  console.log("debut webhook");
  let data;
  let eventType;

  if (webhookSecret) {
    let event;
    let signature = req.headers["stripe-signature"];

    console.log("SIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIUUUUUUUUUUUUUUUUUUUU", webhookSecret);
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        webhookSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err);
      return res.sendStatus(400);
    }
    data = event.data;
    eventType = event.type;
  } else {
    data = req.body.data;
    eventType = req.body.type;
  }

  switch (eventType) {
    case "customer.subscription.created":
      const customerSubscription = data.object;
      console.log("je suis customerSubscription = ", customerSubscription);
      const sub = new Subscription({
        active: true,
        subName: data.object.plan.id
      }
      );
      sub
        .save()
        .then(async (data) => {
          console.log("SIIIIIUKID", customerSubscription.id);
          await User.findByIdAndUpdate(
            customerSubscription.metadata.userId,
            {
              subscription: data._id,
              isSub: true,
              stripeID: customerSubscription.id
            },
            {
              omitUndefined: true,
            }
          ).then(() => {
            console.log("SIUOKUPDATE");

            // mailjet.sendMailSub(
            //   customerSubscription.metadata.email,
            // );
            // return { Updated: true };
          });
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || "Some error occured",
          });
        });
      break;
    case "customer.subscription.deleted":
      const customerSubscriptionDeleted = data.object;
      User.findByIdAndUpdate(
        customerSubscriptionDeleted.metadata.user,
        {
          isSub: false,
        },
        {
          new: true,
        }
      ).then((data) => {
        // mailjet.sendMailUnsub(data.email);
        console.log("SIIIIUDATA", data);
        // Subscription.findByIdAndDelete(data.subscription);
      });
      break;
    default:
  }
  res.sendStatus(200);
};
