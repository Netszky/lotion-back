const config = require("../configs/stripe.configs");
const stripe = require("stripe")(config.stripe.key);
const User = require("../models/users.model");
// const Subscription = require("../models/subscription.model");
// const mailjet = require("../services/mailjet.service");

const webhookSecret = config.stripe.webhook_secret;

exports.stripewebhook = (req, res) => {
  let data;
  let eventType;

  if (webhookSecret) {
    let event;
    let signature = req.headers["stripe-signature"];

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
      const sub = new Subscription({
        dateSub: Date.now(),
        idStripeSub: customerSubscription.id,
        user: customerSubscription.metadata.user,
        price: customerSubscription.metadata.price,
      });
      sub
        .save()
        .then((data) => {
          User.findByIdAndUpdate(
            customerSubscription.metadata.user,
            {
              subscription: data.id,
              isSub: true,
            },
            {
              new: true,
            }
          ).then(() => {
            mailjet.sendMailSub(customerSubscription.metadata.email);
            return { Updated: true };
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
      console.log("Je suis customerSubscriptionDeleted = ",customerSubscriptionDeleted);
      User.findByIdAndUpdate(
        customerSubscriptionDeleted.metadata.user,
        {
          isSub: false,
          superSub: false,
          subscription: null,
        },
        {
          new: true,
        }
      ).then((data) => {
        mailjet.sendMailUnsub(data.email);
        Subscription.findOneAndDelete(
          { idStripeSub: customerSubscriptionDeleted.id },
          function (err, docs) {
            if (err) {
              console.log(err);
            }
          }
        );
      });
      break;
  }
  res.sendStatus(200);
};
