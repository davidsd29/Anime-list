const express = require('express'),
	genres = require('../data/genres'),
	connectDB = require('../config/db.js'),
	{ ObjectId } = require('mongodb');

const router = express.Router();

connectDB();

// Routes
router
	.get('/', async (req, res) => {
		// GET LIST OF ANIMES
		const animes = await db.collection('animes').find({}, {}).toArray();
		res.render('index', {
			animes,
			genres,
		});
	})
	.get('/anime/:id/:slug', async (req, res) => {
		const anime = await db
			.collection('animes')
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
		const animes = await db
			.collection('animes')
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
		let genre = await db
			.collection('animes')
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
		const animes = await db.collection('animes').find({}, {}).toArray();
		const users = await db.collection('users').find({username: "JKKill"}).toArray();
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

	.get('/update-anime/:id/:slug', async (req, res) => {
		const anime = await db
			.collection('animes')
			.find({
				_id: ObjectId(req.params.id),
			})
			.toArray();

		res.render('updateAnime', {
			anime,
			genres
		});
	});

router.use((req, res) => {
	res.status(404).render('404');
});

module.exports = router;
