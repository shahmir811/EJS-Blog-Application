const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const path = require('path');
const expressEJSLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();

// Passport config
require('./config/passport')(passport);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Express-session below
app.use(
	session({
		secret: 'secret',
		resave: true,
		saveUninitialized: true
	})
);
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// connect-flash below
app.use(flash());
// Global Variables
app.use((req, res, next) => {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	next();
});
app.use(express.static(path.join(__dirname, 'public'))); // Only have read access
app.use('/uploads', express.static('uploads'));

// Setting below EJS as our default templating engine
app.use(expressEJSLayouts);
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/posts', require('./routes/posts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`App is running at port: ${PORT}`);
});
