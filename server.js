//Data of Database
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

//connection
const express = require('express'),
	path = require('path'),
	connectDB = require('./config/db.js'),
	methodOverride = require('method-override');

let db, animeCollection, userCollection;

connectDB();

// Routes
const main = require('./routers/pages');
const form = require('./routers/forms');
const animes = require('./routers/animes');
const users = require('./routers/users');

const app = express();

app.set('view engine', 'ejs');

//Middelware (moet gebeuren voordat op je rout komt)
app.use(express.static(path.join(__dirname, 'assets')))
	.use(
		express.urlencoded({
			extended: true,
		})
	)
	.use(methodOverride('_method'));

app.use('/', form);
app.use('/', main);
app.use('/anime', animes);
app.use('/user', users);
app.use((req, res) => {
	res.status(404).render('404');
});



// call back functie
app.listen(process.env.PORT, () => {
	console.log(`code is running in port:${process.env.PORT}`);
	connectDB().then(console.log('We have a mongoDB Connection'));
});
