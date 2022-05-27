//Data of Database
require('dotenv').config();

//connection
const express = require('express'),
	path = require('path'),
	connectDB = require('./config/db.js');

connectDB();

// Routes
const routs = require('./routers/router');
const form = require('./routers/forms');

const app = express();

//Middelware (moet gebeuren voordat op je rout komt)
app.use(express.static(path.join(__dirname, 'assets')));
app.use(
	express.urlencoded({
		extended: true,
	})
);
app.use('/', form);
app.use('/', routs);
app.use((req, res) => {
	res.status(404).render('404');
});

app.set('view engine', 'ejs');

// call back functie
app.listen(process.env.PORT, () => {
	console.log(`code is running in port:${process.env.PORT}`);
	connectDB().then(console.log('We have a mongoDB Connection'));
});
