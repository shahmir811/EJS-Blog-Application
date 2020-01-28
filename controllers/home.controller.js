const moment = require('moment');
const { Post } = require('../models');
// const Sequelize = require('sequelize');

// const Op = Sequelize

exports.getLandingPage = (req, res, next) => {
	res.render('welcome');
};

exports.getDashboardPage = async (req, res, next) => {
	try {
		const posts = await req.user.getPosts({
			include: ['tags'],
			order: [['createdAt', 'DESC']]
		});

		res.render('dashboard', {
			user: req.user,
			posts,
			moment
		});
	} catch (error) {
		console.log('Error: ', error);
	}
};
