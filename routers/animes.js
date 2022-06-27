const express = require('express'),
	multer = require('multer'),
	anime = require('../controller/anime');

// MULTER
const storageAnime = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './assets/uploads/animes'); // store here
	},
	filename: function (req, file, cb) {
		cb(
			null,
			Date.now() + file.originalname // giving name and original name
		);
	},
});

const uploadAnime = multer({
	storage: storageAnime,
});

const app = express.Router();

app.post('/new', uploadAnime.single('tumbnail'), anime.add)
	.post('/edit', anime.edit)
	.post('/like', anime.like)
	.post('/dislike', anime.dislike)
	.delete('/delete', anime.deleteOne);

module.exports = app;
