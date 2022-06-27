const express = require('express');
const passport = require('passport');

const app = express.Router();

app.post(
	'/',
	passport.authenticate('local', {
		successRedirect: '/home',
		failureRedirect: '/login',
		failureFlash: true,
	})
);

module.exports = app;
