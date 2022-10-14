const express = require('express');
const router = express.Router();
const userRouter = require('./users.routes');
const dossierRouter = require('./dossiers.routes');

router.use(userRouter);
router.use(dossierRouter);

module.exports = router;