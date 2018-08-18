const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys'); // ga usah pake .js extension

const app = express();

console.log('before passport.use');

// const log4js = require('log4js');
// log4js.configure({
// 	appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
// 	categories: { default: { appenders: ['cheese'], level: 'debug' } }
// });
//
// const logger = log4js.getLogger('cheese');
// logger.debug('tessss');

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback'
			// callbackURL: 'http://www.lalareza.com'
		},
		(accessToken, refreshToken, profile, done) => {
			console.log('test testttt');
			console.log('access token', accessToken);
			console.log('refresh token', refreshToken);
			console.log('profile', profile);
		}
	)
);

app.get(
	'/auth/google',
	passport.authenticate('google', {
		scope: ['profile', 'email']
	})
);

app.get('/auth/google/callback', passport.authenticate('google'));

const PORT = process.env.PORT || 5000;
app.listen(PORT);
