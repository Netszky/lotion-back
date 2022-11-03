const express = require('express');
const router = express.Router();
const user = require('../controllers/users.controller');
const verifyToken = require('../middlewares/verifyToken')
const addUserValidation = require('../middlewares/validators/users.validator')

//Creation de l'utilisateur
router.post('/users', addUserValidation, user.create);

//Connexion
router.post('/users/login', user.login);

//Recuperation via Id
router.get('/user', verifyToken, user.findOne)

//MAJ user
router.put('/users/update', verifyToken, user.updateUser);

router.post('/users/updatePassword', user.updatePassword)

router.delete('/users', verifyToken, user.deleteUser)

router.get("/users/verifyToken", verifyToken, user.verifyToken);

module.exports = router;
