const express = require('express'),
	genres = require('../data/genres'),
	connectDB = require('../config/db.js'),
	{ ObjectId } = require('mongodb');

const app = express.Router();

connectDB();

// Routes
app.get('/home', async (req, res) => {
	// GET LIST OF ANIMES
	const animes = await animeCollection.find({}, {}).toArray();
	res.render('index', {
		animes,
		genres,
	});
})
	.get('/anime/:id/:slug', async (req, res) => {
		const anime = await animeCollection
			.find({
				_id: ObjectId(req.params.id),
			})
			.toArray();

		res.render('single', {
			anime,
			genres,
		});
	})
	.get('/my-list', async (req, res) => {
		const animes = await animeCollection
			.find({
				like: true,
			})
			.toArray();
		res.render('mylist', {
			animes,
			genres,
		});
	})
	.get('/genre', async (req, res) => {
		let genre = await animeCollection
			.find({
				genres: req.query.genre,
			})
			.toArray();

		res.render('genres', {
			genres,
			genre,
		});
	})

	.get('/profile', async (req, res) => {
		const animes = await animeCollection.find({}, {}).toArray();
		const users = await userCollection.find({ username: 'JKKill' }).toArray();
		res.render('profile', {
			animes,
			users,
		});
	})
	.get('/new-anime', (req, res) => {
		res.render('newAnime', {
			genres,
		});
	})
	.get('/register', (req, res) => {
		res.render('register');
	})

	.get('/update-anime', async (req, res) => {
		const anime = await animeCollection
			.find({
				_id: ObjectId(req.query.id),
			})
			.toArray();

		res.render('updateAnime', {
			anime,
			genres,
		});
	});

module.exports = app;
