const { ObjectId } = require('mongodb');

const add = async (req, res) => {
	const sessionUser = req.session.passport.user;

	try {
		const newAnime = await animeCollection.insertOne({
			name: req.body.name,
			slug: req.body.name,
			tumbnail: req.file.filename,
			rating: req.body.rating,
			like: false,
			genres: [req.body.genre],
			episodes: req.body.episodes,
			storyline: req.body.storyline,
		});

		const animeId = newAnime.insertedId;
		console.log(animeId);
		await userCollection.updateOne(
			{ _id: ObjectId(sessionUser) },
			{ $push: { myAnime: animeId } }
		);

		res.redirect('/home');
	} catch (err) {
		res.status(400).send(err.message);
	}
};

const edit = async (req, res) => {
	const query = { _id: ObjectId(req.body.update) };
	try {
		await animeCollection.updateOne(query, {
			$set: {
				name: req.body.name,
				slug: req.body.name,
				rating: req.body.rating,
				episodes: req.body.episodes,
				storyline: req.body.storyline,
			},
		});
		res.redirect('/home');
	} catch (err) {
		res.status(400).send(err.message);
	}
};
const like = async (req, res) => {
	const sessionUser = req.session.passport.user;

	await userCollection.updateOne(
		{
			_id: ObjectId(sessionUser),
		},
		{ $push: { myAnime: ObjectId(req.body.like) } }
	);

	res.redirect('/my-list');
};

const dislike = async (req, res) => {
	const sessionUser = req.session.passport.user;

	await userCollection.updateOne(
		{
			_id: ObjectId(sessionUser),
		},
		{ $pull: { liked: ObjectId(req.body.remove) } }
	);

	res.redirect('/my-list');
};

const deleteOne = async (req, res) => {
	await animeCollection.deleteOne({
		_id: ObjectId(req.body.delete),
	});

	res.redirect('/home');
};

module.exports = { add, edit, like, dislike, deleteOne };
