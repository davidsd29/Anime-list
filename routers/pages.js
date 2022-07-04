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
					user,
					genres,
				});
			});
		}
	})
	.get('/new-anime', async (req, res) => {
		const sessionUser = req.session.passport.user;

		const user = await userCollection.findOne(
			{ _id: ObjectId(sessionUser) },
			{}
		);

		res.render('newAnime', {
			genres,
			user
		});
	})
	.get('/anime/:id/:slug', checkAuthenticated, async (req, res) => {
		const sessionUser = req.session.passport.user;

		const user = await userCollection.findOne({ _id: ObjectId(sessionUser) });

		const liked = user.liked;
		const item = await animeCollection
			.find({
				_id: ObjectId(req.params.id),
			})
			.toArray();
		const animes = Object.assign({}, item);
		const anime = animes[0];
		console.log(liked);
		console.log(anime._id);

		if (liked.includes(anime._id)) {
			console.log('liked');
		} else if (liked === anime._id) {
			console.log('peer');
		} else if (liked.indexOf(anime._id) >= 0) {
			console.log('appel');
		}

		var length = liked.length;
		for (var i = 0; i < length; i++) {
			if (liked[i] == anime._id) {
				console.log('kiwi');
			}
		}

		res.render('single', {
			anime,
			liked,
			user,
			genres,
		});
	})
	.get('/update-anime', checkAuthenticated, async (req, res) => {
				const sessionUser = req.session.passport.user;

		const user = await userCollection.findOne(
			{ _id: ObjectId(sessionUser) },
			{}
		);

		const anime = await animeCollection
			.find({
				_id: ObjectId(req.query.id),
			})
			.toArray();

		res.render('updateAnime', {
			anime,
			genres,
			user,
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
				res.render('mylist', {
					animes,
					user,
					genres,
				});
			});
		} else {
			res.render('mylist', {
				genres,
			});
		}
	})
	.get('/genre', checkAuthenticated, async (req, res) => {
				const sessionUser = req.session.passport.user;

		const user = await userCollection.findOne(
			{ _id: ObjectId(sessionUser) },
			{}
		);

		let genre = await animeCollection
			.find({
				genres: req.query.genre,
			})
			.toArray();

		res.render('genres', {
			genres,
			user,
			genre,
		});
	})
	.get('/My-profile', checkAuthenticated, async (req, res) => {
		const sessionUser = req.session.passport.user;

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
				res.render('profile', {
					animes,
					user,
				});
			});
		} 
	})	.get('/user-profile', checkAuthenticated, async (req, res) => {

		const user = await userCollection.findOne(
			{ _id: ObjectId(req.query.id) },
			{}
		);

		if (user.liked) {
			const anime = user.liked.map((anime) =>
				animeCollection.find({ _id: new ObjectId(anime) }, {}).toArray()
			);
			

			Promise.all(anime).then((data) => {
				const animes = data.flat();
				res.render('profile', {
					animes,
					user,
				});
			});
		} 
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
