const express = require('express');
const router = express.Router();
const { authUser, registerUser } = require('../controllers/authController.js');

router.post('/register', registerUser);
router.post('/login', authUser);

module.exports = router;
