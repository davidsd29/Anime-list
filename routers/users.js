const express = require('express'),
	multer = require('multer'),
	user = require('../controller/user');

const storageUser = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './assets/uploads/users');
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + file.originalname);
	},
});

const uploadUser = multer({
	storage: storageUser,
});

const app = express.Router();

app.post('/register', uploadUser.single('profile_photo'), user.register)
	.post('/edit', user.edit)
	.post('/delete', user.deleteOne);

module.exports = app;
