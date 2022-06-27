const { ObjectId } = require('mongodb');

const add = async (req, res) => {
	try {
		await animeCollection.insertOne({
			name: req.body.name,
			slug: req.body.name,
			tumbnail: req.file.filename,
			rating: req.body.rating,
			like: false,
			genres: [req.body.genre],
			episodes: req.body.episodes,
			storyline: req.body.storyline,
		});

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

const deleteOne = async (req, res) => {
	await animeCollection.deleteOne({
		_id: ObjectId(req.body.delete),
	});

	res.redirect('/home');
};

module.exports = { add, edit, deleteOne };
