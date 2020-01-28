const { User } = require('../models');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Get Login Page
exports.getLogin = (req, res, next) => {
	res.render('login');
};

// POST - Login user
exports.postLogin = async (req, res, next) => {
	passport.authenticate('local', {
		successRedirect: '/dashboard',
		failureRedirect: '/users/login',
		failureFlash: true
	})(req, res, next);
};

// Get Register Page
exports.getRegister = (req, res, next) => {
	res.render('register');
};

// POST - Register new user
exports.addUser = async (req, res, next) => {
	const { name, email, password, password2 } = req.body;

	let errors = [];
	// Check required fields
	if (!name || !email || !password || !password2) {
		errors.push({ msg: 'Please fill in all fields' });
	}

	if (password !== password2) {
		errors.push({ msg: 'Passwords donot match' });
	}

	if (password.length < 6) {
		errors.push({ msg: 'Password should be atleast 6 characters long' });
	}

	if (errors.length > 0) {
		res.render('register', {
			errors,
			name,
			email,
			password,
			password2
		});
	} else {
		try {
			const user = await User.findAll({ where: { email } });

			if (user.length !== 0) {
				errors.push({ msg: 'Email is already in use' });
				return res.render('register', {
					errors,
					name,
					email,
					password,
					password2
				});
			}

			// Encrypt password
			const salt = await bcrypt.genSalt(10);
			const encryptedPassword = await bcrypt.hash(password, salt);

			await User.create({
				name,
				email: email.toLowerCase(),
				password: encryptedPassword,
				RoleId: 2
			});

			req.flash('success_msg', 'Registered successfully');

			res.redirect('/users//login');
		} catch (error) {
			console.log('=================================================');
			console.log('ERROR: ', error);
			console.log('=================================================');
		}
	}
};

// GET - Logout User
exports.logoutUser = (req, res, next) => {
	req.logout();
	req.flash('success_msg', 'Logout successfully');
	res.redirect('/users/login');
};
