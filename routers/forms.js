const express = require('express'),
	{ ObjectId } = require('mongodb');

const app = express.Router();

// UPDATE
app.post('/dislike', async (req, res) => {
	await animeCollection.updateOne(
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
