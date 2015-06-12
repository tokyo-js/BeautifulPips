module.exports = function () {
	'use strict';
	const
		passport = require('passport')
		, GoogleStrategy = require('passport-google-openidconnect').Strategy
		, User = require('../models/mongoose.User').model;

	passport.serializeUser(function (user, done) {
		done(null, user);
	});

	passport.deserializeUser(function (user, done) {
		done(null, user);
	});

	passport.use(new GoogleStrategy({
		clientID : '1029490117085-k72kbs602blcdh3sjaf11tb3qi7n7l36.apps.googleusercontent.com',
		clientSecret : 'Mlm-YqHgDkc2v1BiCcQL8wZ0',
		callbackURL : 'http://localhost:3000/auth/google/return'
	}, function (iss, sub, profile, accessToken, refreshToken, done) {
		User.findOne({ 'google.id' : profile.id }, function (err, user) {
			if (err) {
				return done(err);
			}
			if (!user) {
				user = new User();
			}
			user.email = profile._json.email;
			user.google.id = profile.id;
			user.google.email = profile._json.email;
			user.google.name = profile.displayName;
			user.save(function (err) {
				if (err) {
					throw err;
				}
				done(null, user);
			});
		});
	}));
}