const express = require('express'),
	{ ObjectId } = require('mongodb');

const app = express.Router();

// UPDATE
app.post('/like', async (req, res) => {
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
}).post('/remove-fav', async (req, res) => {
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
});

module.exports = app;
