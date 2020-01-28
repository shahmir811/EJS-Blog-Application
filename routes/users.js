const express = require('express');

const router = express.Router();

const {
	getLogin,
	postLogin,
	getRegister,
	addUser,
	logoutUser
} = require('../controllers/user.controller');

// Login Page
router.get('/login', getLogin);

// POST - Login User
router.post('/login', postLogin);

// Register Page
router.get('/register', getRegister);

// POST - Register new user
router.post('/register', addUser);

// GET - Logout User
router.get('/logout', logoutUser);

module.exports = router;
