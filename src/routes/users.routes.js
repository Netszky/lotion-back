const express = require('express');
const router = express.Router();
const user = require('../controllers/users.controller');
const verifyToken = require('../middlewares/verifyToken')
const addUserValidation = require('../middlewares/validators/users.validator')

//Creation de l'utilisateur
router.post('/users', addUserValidation, user.create);

//Connexion
router.post('/users/login', user.login);

router.delete('/users', verifyToken, user.deleteUser)
module.exports = router;
