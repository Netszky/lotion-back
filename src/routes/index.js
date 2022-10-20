const express = require('express');
const router = express.Router();
const userRouter = require('./users.routes');
const mailRouter = require('./mails.routes');
const webhooksRouter = require('./webhooks.routes');
const stripeRouter = require('./stripes.routes')

router.use(userRouter, mailRouter, webhooksRouter, stripeRouter);
const dossierRouter = require('./dossiers.routes');
const notesRouter = require('./notes.routes');

router.use(userRouter);
router.use(dossierRouter);
router.use(notesRouter);

module.exports = router;