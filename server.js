//Data of Database
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}
const express = require('express'),
	flash = require('express-flash'),
	session = require('express-session'),
	passport = require('passport'),
	path = require('path'),
	methodOverride = require('method-override'),
	helmet = require('helmet'),
	connectDB = require('./config/db'),
	initializePassport = require('./config/passport-config');

let db, animeCollection, userCollection;

initializePassport(
  passport,
  (email) => user.find((user) => user.email === email),
  (_id) => user.find((user) => user._id === _id)
);

connectDB();

// Routes
const main = require('./routers/pages');
const form = require('./routers/forms');
const animes = require('./routers/animes');
const users = require('./routers/users');
const login = require('./routers/login');

const app = express();

app.set('view engine', 'ejs');

//Middelware (moet gebeuren voordat op je rout komt)
app.use(express.static(path.join(__dirname, 'assets')))
	.use(
		express.urlencoded({
			extended: true,
		})
	)
	.use(flash())
	.use(
		session({
			secret: process.env.SESSION_SECRET,
			resave: false, // dont save if nothing in de session has change
			saveUninitialized: false, // don't save an empty value
		})
	)
	.use(passport.initialize())
	.use(passport.session())
	.use(methodOverride('_method'));

app.use('/', form);
app.use('/', main);
app.use('/anime', animes);
app.use('/user', users);
app.use('/login', login);
app.use((req, res) => {
	res.status(404).render('404');
});

// call back functie
app.listen(process.env.PORT, () => {
	console.log(`code is running in port:${process.env.PORT}`);
	connectDB().then(console.log('We have a mongoDB Connection'));
});
