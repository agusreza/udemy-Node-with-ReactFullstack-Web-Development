const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys'); // ga usah pake .js extension

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
	done(null, user.id); //ini user.id buat cookie, mau ngambil dari mongodb
});

passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
		done(null, user);
	});
});

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback',
			passReqToCallback: true,
			proxy: true
			// callbackURL: 'http://www.lalareza.com'
		},
		(accessToken, refreshToken, profile, done) => {
			User.findOne({ googleId: profile.id }).then(existingUser => {
				if (existingUser) {
					//record sudah ada di database; untuk profileID tersebut
					done(null, existingUser);
				} else {
					//record belum ada; buat record baru di database
					// dari google ID
					new User({ googleId: profile.id })
						.save()
						.then(user => done(null, user));
				}
			});
		}
	)
);

// passport.use(
// 	new GoogleStrategy(
// 		{
// 			clientID: keys.googleClientID,
// 			clientSecret: keys.googleClientSecret,
// 			callbackURL: '/auth/google/callback'
// 			// callbackURL: 'http://www.lalareza.com'
// 		},
// 		(accessToken, refreshToken, profile, done) => {
// 			console.log('test testttt');
// 			console.log('access token', accessToken);
// 			console.log('refresh token', refreshToken);
// 			console.log('profile', profile);
// 		}
// 	)
// );
