	const { ObjectId } = require('mongodb')

const add = async (req, res) => {
	await userCollection.insertOne({
		name: req.body.name,
		username: req.body.username,
		tumbnail: req.file.filename,
		email: req.body.email,
		password: req.body.psw,
	});
};

const edit = async (req, res) => {
	try {
		await userCollection.updateOne(query, {
			$set: {
				name: req.body.name,
				username: req.body.username,
				tumbnail: req.file.filename,
				email: req.body.email,
				password: req.body.psw,
			},
		});

       res.redirect('/profile');
	} catch (err) {
		res.status(400).send(err.message);
	}
};

const deleteOne = async (req, res) => {
	await userCollection.deleteOne({
		_id: ObjectId(req.body.delete),
	});

	res.redirect('/home');
};

module.exports = { add, edit, deleteOne };