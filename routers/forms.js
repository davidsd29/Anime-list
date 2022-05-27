const express = require('express'),
	multer = require('multer'),
	connectDB = require('../config/db.js'),
	{ ObjectId } = require('mongodb');

const form = express.Router();

connectDB();

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

const storageUser = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './assets/uploads/users');
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + file.originalname);
	},
});

const uploadAnime = multer({
	storage: storageAnime,
});

const uploadUser = multer({
	storage: storageUser,
});

// INSERT NEW
form
	.post('/register', uploadUser.single('profile_photo'), async (req, res) => {
		await db.collection('users').insertOne({
			name: req.body.name,
			username: req.body.username,
			tumbnail: req.file.filename,
			email: req.body.email,
			password: req.body.psw,
		});
	})
	.post('/new', uploadAnime.single('tumbnail'), async (req, res) => {
		await db.collection('animes').insertOne({
			name: req.body.name,
			slug: req.body.name,
			tumbnail: req.file.filename,
			rating: req.body.rating,
			like: false,
			genres: [req.body.genre],
			episodes: req.body.episodes,
			storyline: req.body.storyline,
		});

		res.redirect('/');
	});

// UPDATE
form
	.post('/like', async (req, res) => {
		await db.collection('animes').updateOne(
			{
				_id: ObjectId(req.body.like),
			},
			{
				$set: {
					like: true,
				},
			}
		);

		res.redirect('/my-list');
	})
	.post('/remove-fav', async (req, res) => {
		await db.collection('animes').updateOne(
			{
				_id: ObjectId(req.body.remove),
			},
			{
				$set: {
					like: false,
				},
			}
		);

		res.redirect('/my-list');
	})
	.post('/edit-anime', async (req, res) => {
		console.log('appel');
		await db.collection('animes').replaceOne(
			{
				_id: ObjectId(req.body.update),
			},
			{
				'name': req.body.name,
				'slug': req.body.name,
				'rating': req.body.rating,
				'episodes': req.body.episode,
				'storyline': req.body.storyline,
			},
			{}
		);

		res.redirect('/');
	});

// DELETE
form.post('/delete', async (req, res) => {
	await db.collection('animes').deleteOne({
		_id: ObjectId(req.body.delete),
	});

	res.redirect('/');
});

module.exports = form;
