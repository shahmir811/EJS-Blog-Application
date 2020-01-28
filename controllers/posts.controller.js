const { Tag, Post } = require('../models');
const fs = require('fs');
const bcrypt = require('bcryptjs');

///////////////////////// GET new post page /////////////////////////
exports.getNewPost = async (req, res, next) => {
	try {
		const tags = await Tag.findAll({
			attributes: ['id', 'name']
		});

		res.render('posts/add', {
			tags
		});
	} catch (error) {
		console.log('ERROR: ', error);
	}
};

///////////////////////// POST add new post /////////////////////////
exports.addNewPost = async (req, res, next) => {
	const { title, description, selectedTags, postImage } = req.body;
	let errors = [];

	try {
		const tags = await Tag.findAll({
			attributes: ['id', 'name']
		});

		if (!title) {
			errors.push({ msg: 'Kindly mention title' });
			return res.render('posts/add', {
				tags,
				title,
				description,
				selectedTags,
				postImage,
				errors
			});
		}

		if (!selectedTags) {
			errors.push({ msg: 'Atleast select a single tag' });
			return res.render('posts/add', {
				tags,
				title,
				description,
				selectedTags,
				postImage,
				errors
			});
		}

		const post = await req.user.createPost({
			title,
			description,
			path: req.file.path
		});

		await post.setTags(selectedTags);

		req.flash('success_msg', 'New post added');
		res.redirect('/dashboard');
	} catch (error) {
		console.log('ERROR: ', error);
	}
};

///////////////////////// GET view post /////////////////////////
exports.viewPost = async (req, res, next) => {
	const id = req.params.id;

	// get the current URL (like http://localhost:5000)
	let url = req.protocol + '://' + req.get('host');

	console.log('URL: ', url);

	try {
		const post = await Post.findByPk(id, {
			include: ['tags']
		});

		if (post.UserId !== req.user.id) {
			return res.redirect('/users/login');
		}

		res.render('posts/view', {
			post,
			imagePath: `${url}/${post.path}`
		});
	} catch (error) {
		console.log('ERROR: ', error);
	}
};

///////////////////////// POST delete post /////////////////////////
exports.deletePost = async (req, res, next) => {
	const id = req.params.id;

	try {
		const post = await Post.findByPk(id);
		// 1 - remove associations
		await post.setTags(null);

		// 2 - delete image from uploads folder
		fs.unlinkSync(post.path);

		// 3 - remove entry from posts table
		await post.destroy();

		// 4 - success message
		req.flash('success_msg', 'Post deleted successfully');
		return res.status(200).json({
			msg: `Post ID: ${id} is deleted successfully`
		});
	} catch (error) {
		return res.status(500).json({
			msg: `Post ID: ${id} not deleted `,
			error
		});
	}
};

///////////////////////// GET edit post /////////////////////////
exports.editPost = async (req, res, next) => {
	const id = req.params.id;

	try {
		const tags = await Tag.findAll({
			attributes: ['id', 'name']
		});

		const post = await Post.findByPk(id, {
			include: ['tags']
		});

		if (post.UserId !== req.user.id) {
			return res.redirect('/users/login');
		}

		res.render('posts/edit', {
			tags,
			post,
			selectedTagsId: post.tags.map(tag => tag.id)
		});
	} catch (error) {
		console.log('ERROR: ', error);
	}
};

///////////////////////// POST update post /////////////////////////
exports.updatePost = async (req, res, next) => {
	const id = req.params.id;
	const { title, description, selectedTags, postImage } = req.body;
	console.log('Upload File: ', req.file);

	try {
		// 1 - get post that needs to be updated
		const post = await Post.findByPk(id);

		// 2 - Remove old associations and add new
		await post.setTags(null);
		await post.setTags(selectedTags);

		// 3 - if it contains image, then delete old image and add new one
		if (req.file != undefined) {
			// Means that there will be new file
			// a - delete old file from disk
			fs.unlinkSync(post.path);
		}

		// 4 - update post entries in table
		await post.update({
			title,
			description,
			path: req.file != undefined ? req.file.path : post.path
		});

		// 5 - Success message and redirect
		req.flash('success_msg', 'Post details updated successfully');
		res.redirect('/dashboard');
	} catch (error) {
		console.log('ERROR: ', error);
	}
};

exports.profile = (req, res, next) => {
	const user = req.user;

	res.render('customer/profile', {
		user
	});
};

exports.getUpdatePassword = (req, res, next) => {
	res.render('customer/updatePassword');
};

exports.postUpdatePassword = async (req, res, next) => {
	const { oldPassword, newPassword, confirmPassword } = req.body;
	let errors = [];

	try {
		// 1 - Check newPassword and confirmPasswordMathes
		if (newPassword !== confirmPassword) {
			errors.push({
				msg: 'Password mismatch error'
			});
		}

		// 2 - Check Passwords length
		if (newPassword.length < 6) {
			errors.push({
				msg: 'Password should be atleast 6 characters long'
			});
		}

		if (errors.length > 0) {
			return res.render('customer/updatePassword', {
				errors
			});
		}

		// 3 - Get user and match password
		const user = req.user;
		const isMatch = await bcrypt.compare(oldPassword, user.password);
		if (!isMatch) {
			errors.push({
				msg: 'Old password is not correct'
			});
			return res.render('customer/updatePassword', {
				errors
			});
		}

		// 4 - Encrypt password
		const salt = await bcrypt.genSalt(10);
		const encryptedPassword = await bcrypt.hash(newPassword, salt);

		// 5 - Save encrypted password to db
		await user.update({
			password: encryptedPassword
		});

		// 6 - Success message and redirect
		req.flash('success_msg', 'Password is updated successfully');
		res.redirect('/posts/profile');
	} catch (error) {
		console.log('ERROR: ', error);
	}
};
