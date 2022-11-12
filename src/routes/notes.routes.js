const express = require('express');
const router = express.Router();
const note = require('../controllers/notes.controller');
const verifyToken = require('../middlewares/verifyToken');

router.post('/note', verifyToken, note.create);
router.put("/update-note", verifyToken, note.update);
router.delete('/note', verifyToken, note.delete);
router.get('/note-status', verifyToken, note.getByStatus);
router.put('/note-trash', verifyToken, note.addToTrash);
router.put('/note-draft', verifyToken, note.addToDraft);
router.put('/note-archive', verifyToken, note.addToArchive);
router.get("/note-folder", verifyToken, note.getNoteByFolder);
router.put('/note-activate', verifyToken, note.activate);
router.get('/note-search', verifyToken, note.search);
router.get("/note-id", verifyToken, note.getNoteById);
router.get("/note-share", verifyToken, note.shareNote);
router.put("/note-collab", verifyToken, note.addColab);
router.put("/note-rcollab", verifyToken, note.removeColab);
router.get("/note-shared", verifyToken, note.getShared);

module.exports = router;