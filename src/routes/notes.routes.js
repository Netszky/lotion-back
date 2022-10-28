const express = require('express');
const router = express.Router();
const note = require('../controllers/notes.controller');
const verifyToken = require('../middlewares/verifyToken');

router.post('/note', note.create);
router.put("/update-note", note.update);
router.delete('/note', note.delete);
router.get('/note-status', note.getByStatus);
router.put('/note-trash', note.addToTrash);
router.put('/note-draft', note.addToDraft);
router.put('/note-archive', note.addToArchive);
router.get("/note-folder", note.getNoteByFolder);
router.put('/note-activate', note.activate);
router.get('/note-search', note.search);

module.exports = router;