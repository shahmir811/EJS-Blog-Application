const express = require('express');
const multer = require('multer');

const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const {
	getNewPost,
	addNewPost,
	viewPost,
	deletePost,
	editPost,
	updatePost,
	profile,
	getUpdatePassword,
	postUpdatePassword
} = require('../controllers/posts.controller');

// Multer setup for storing files in storage
const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, 'uploads/');
	},
	filename: (req, file, callback) => {
		callback(null, Date.now() + file.originalname.split(' ').join('_')); // replace space with underscores
	}
});

const fileFilter = (req, file, callback) => {
	// only upload images of type jpeg, png or jpg
	if (
		file.mimetype === 'image/jpeg' ||
		file.mimetype === 'image/png' ||
		file.mimetype === 'image/jpg'
	) {
		//accept file
		callback(null, true);
	} else {
		// reject file
		callback(
			new Error('Only upload files with extension jpeg, jpg or png'),
			false
		);
	}
};

const upload = multer({
	storage,
	fileFilter,
	limits: { fileSize: 1024 * 1024 * 10 } // only allow 10MB
});

router.get('/add', ensureAuthenticated, getNewPost);

router.post('/', [ensureAuthenticated, upload.single('postImage')], addNewPost);

router.post(
	'/:id/update',
	[ensureAuthenticated, upload.single('postImage')],
	updatePost
);

router.get('/:id/view', ensureAuthenticated, viewPost);

router.post('/:id/delete', ensureAuthenticated, deletePost);

router.get('/:id/edit', ensureAuthenticated, editPost);

router.get('/profile', ensureAuthenticated, profile);

router.get('/updatePassword', ensureAuthenticated, getUpdatePassword);

router.post('/updatePassword', ensureAuthenticated, postUpdatePassword);

module.exports = router;
