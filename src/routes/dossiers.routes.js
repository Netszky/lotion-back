const express = require('express');
const router = express.Router();
const dossier = require('../controllers/dossier.controller');
const verifyToken = require('../middlewares/verifyToken');

router.post('/dossier', dossier.create);
router.get("/dossiers", dossier.getAll);

module.exports = router;