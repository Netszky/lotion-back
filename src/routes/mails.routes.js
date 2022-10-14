const express = require('express');
const router = express.Router();
const mail = require('../controllers/mails.controller');
const verifyToken = require('../middlewares/verifyToken')


//Envoyer mail
router.post('/resetPassword', mail.resetPassword);

module.exports = router;
