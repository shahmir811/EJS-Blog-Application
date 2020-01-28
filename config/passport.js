const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const { User } = require('../models');

module.exports = passport => {
	passport.use(
		new LocalStrategy(
			{ usernameField: 'email' },
			async (email, password, done) => {
				// Match user
				const user = await User.findOne({ where: { email } });
				if (!user) {
					return done(null, false, {
						message: 'That email is not registered'
					});
				}

				// Match password
				const isMatch = await bcrypt.compare(password, user.password);
				if (!isMatch) {
					return done(null, false, { message: 'Password incorrect' });
				}

				return done(null, user);
			}
		)
	);

	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser(async (id, done) => {
		try {
			let user = await User.findByPk(id);
			if (!user) {
				return done(new Error('user not found'));
			}
			done(null, user);
		} catch (e) {
			done(e);
		}
	});
};
