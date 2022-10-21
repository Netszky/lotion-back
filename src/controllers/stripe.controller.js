const config = require('../configs/stripe.configs');
const stripe = require('stripe')(config.stripe.key)
const User = require('../models/users.model');




const initiateStripeSession = async (req) => {
  const subscription = await stripe.checkout.sessions.create({
    line_items: [
      { price: req.body.priceId, quantity: 1 },
    ],
    subscription_data: {
      metadata: {
        userId: req.user.user._id,
        email: req.body.email
      },
    },
    success_url: "http://localhost:3000/ok",
    cancel_url: "http://localhost:3000/PASOK",
    mode: 'subscription',
  });
  return subscription;
}


exports.createSession = async function (req, res) {
  try {
    const subscription = await initiateStripeSession(req)
    res.status(200).json({
      id: subscription.id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getPrices = async function (req, res) {
  await stripe.prices.list({
    limit: 2,
  })
    .then((data) => {
      res.send({
        prices: data,
        response: true
      });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({
        error: 500,
        message: err.message || "NULL"
      })
    })
}

exports.deleteSub = async function (req, res) {
  await User.findById(req.user.user._id)
    .then((data) => {
      console.log("SIUUUUUSERSTRIPEID", data);
      stripe.subscriptions.del(data.stripeID)
        .then(() => {
          res.send({
            deleted: true,
            response: true
          });
        })
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({
        error: 500,
        message: err.message || "NULL"
      })
    })
}