const express = require('express');
const router = express.Router();
const userRouter = require('./users.routes');
const mailRouter = require('./mails.routes')

router.use(userRouter, mailRouter);
const dossierRouter = require('./dossiers.routes');
const notesRouter = require('./notes.routes');

router.use(userRouter);
router.use(dossierRouter);
router.use(notesRouter);

module.exports = router;