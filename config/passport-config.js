const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const { ObjectId } = require('mongodb');

async function initialize(passport) {
	const authenticateUser = async (email, password, done) => {
		const user = await userCollection.findOne({ email: email });

		if (user == null) {
			return done(null, false, { message: 'No user with that email' });
		}

		try {
			if (await bcrypt.compare(password, user.password)) {
				return done(null, user);
			} else {
				return done(null, false, { message: 'Email or Password incorrect. Please try again' });
			}
		} catch (e) {
			return done(e);
		}
	};

	passport.use(
		new LocalStrategy({ usernameField: 'email' }, authenticateUser)
	);
	passport.serializeUser((user, done) => done(null, user._id));
	passport.deserializeUser((id, done) => {
		return done(null, userCollection.findOne({ _id: ObjectId(id) }));
	});
}

module.exports = initialize;
