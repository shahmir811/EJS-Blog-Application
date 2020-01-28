const express = require('express');

const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

const {
	getLandingPage,
	getDashboardPage
} = require('../controllers/home.controller');

router.get('/', getLandingPage);

router.get('/dashboard', ensureAuthenticated, getDashboardPage);

module.exports = router;
