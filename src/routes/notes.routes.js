const express = require('express');
const router = express.Router();
const note = require('../controllers/notes.controller');
const verifyToken = require('../middlewares/verifyToken');

router.post('/note', note.create);
router.put("/update-note", note.update);
// router.get("/dossiers1", dossier.getLevel1);

module.exports = router;