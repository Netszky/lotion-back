const express = require('express');
const router = express.Router();
const stripe = require('../controllers/stripe.controller');
const verifyToken = require('../middlewares/verifyToken');
// const verifyTokenSub = require('../middlewares/verifyTokenSub');

router.post('/checkout', verifyToken, stripe.createSubscription);
router.get('/prices', verifyToken, stripe.getPrices);
// router.delete('/sub', verifyTokenSub, stripe.deleteSub);


module.exports = router; 