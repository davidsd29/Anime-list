const { ObjectId } = require('mongodb'),
	bcrypt = require('bcrypt');

const register = async (req, res) => {
	const hashedPassword = await bcrypt.hash(req.body.password, 10);

	try {
		await userCollection.insertOne({
			name: req.body.name,
			username: req.body.username,
			tumbnail: req?.file?.filename,
			email: req.body.email,
			password: hashedPassword,
		});

		console.log(hashedPassword);
		console.log(req.body.password);
	} catch (err) {
		res.status(400).send(err.message);
	}
};

const edit = async (req, res) => {
	// const query = { _id : }
	try {
		await userCollection.updateOne(query, {
			$set: {
				name: req.body.name,
				username: req.body.username,
				tumbnail: req?.file?.filename,
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

module.exports = { register, edit, deleteOne };
