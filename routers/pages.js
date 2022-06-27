const express = require('express'),
	genres = require('../data/genres'),
	connectDB = require('../config/db.js'),
	{ ObjectId } = require('mongodb'),
	checkAuthenticated = require('../controller/authenticate');

const app = express.Router();

connectDB();

// Routes
app.get('/', async (req, res) => {
	res.render('start');
})

	.get('/home', checkAuthenticated, async (req, res) => {
		const sessionUser = req.session.passport.user;

		// GET LIST OF ANIMES BASSED ON USER
		const user = await userCollection.findOne(
			{ _id: ObjectId(sessionUser) },
			{}
		);
		if (user.myAnime) {
			const anime = user.myAnime.map((anime) =>
				animeCollection.find({ _id: new ObjectId(anime) }, {}).toArray()
			);
			Promise.all(anime).then((data) => {
				const animes = data.flat(); // squeeze multiple array
				res.render('home', {
					animes,
					genres,
				});
			});
		}
	})
	.get('/new-anime', (req, res) => {
		res.render('newAnime', {
			genres,
		});
	})
	.get('/anime/:id/:slug', checkAuthenticated, async (req, res) => {
		const sessionUser = req.session.passport.user;

		const user = await userCollection.findOne(
			{ _id: ObjectId(sessionUser) });

			const liked = user.liked;
		const anime = await animeCollection
			.find({
				_id: ObjectId(req.params.id),
			});
		
console.log(anime);
		res.render('single', {
			anime,
			liked,
			genres,
		});
	})
	.get('/update-anime', checkAuthenticated, async (req, res) => {
		const anime = await animeCollection
			.find({
				_id: ObjectId(req.query.id),
			})
			.toArray();

		res.render('updateAnime', {
			anime,
			genres,
		});
	})
	.get('/my-list', checkAuthenticated, async (req, res) => {
		const sessionUser = req.session.passport.user;

		// GET LIST OF LIKED ANIMES BASSED ON USER
		const user = await userCollection.findOne(
			{ _id: ObjectId(sessionUser) },
			{}
		);
		if (user.liked) {
			const anime = user.liked.map((anime) =>
				animeCollection.find({ _id: new ObjectId(anime) }, {}).toArray()
			);
			

			Promise.all(anime).then((data) => {
				const animes = data.flat();
				console.log(animes);
				res.render('mylist', {
					animes,
					genres,
				});
			});
		} else{
			res.render('mylist', {
					genres,
				});
		}
	})
	.get('/genre', checkAuthenticated, async (req, res) => {
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
	.get('/profile', checkAuthenticated, async (req, res) => {
		const sessionUser = req.session.passport.user;
		const animes = await animeCollection.find({}, {}).toArray();
		const users = await userCollection
			.find({ _id: ObjectId(sessionUser) })
			.toArray();
		res.render('profile', {
			animes,
			users,
		});
	})

	.get('/register', (req, res) => {
		res.render('register');
	})
	.get('/login', async (req, res) => {
		res.render('login');
	})

	.delete('/logout', (req, res) => {
		req.logout((err) => {
			if (err) {
				return next(err);
			}
			res.redirect('/');
		});
	});

module.exports = app;
