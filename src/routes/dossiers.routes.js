const express = require('express');
const router = express.Router();
const dossier = require('../controllers/dossier.controller');
const verifyToken = require('../middlewares/verifyToken');

router.post('/dossier', verifyToken, dossier.create);
router.get("/dossiers", dossier.getAll);
router.get("/dossierbyid", dossier.getFolder)
router.get("/dossiers1", verifyToken, dossier.getLevel1);
router.get("/dossier-sub", verifyToken, dossier.getSub);
router.delete("/dossier", verifyToken, dossier.delete)
router.put("/dossier-rename", verifyToken, dossier.rename);

module.exports = router;