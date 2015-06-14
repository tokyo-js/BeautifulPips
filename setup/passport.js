module.exports = function () {
	'use strict';
	const
		passport = require('passport')
		, GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
		, FacebookStrategy = require('passport-facebook').Strategy
		, LocalStrategy = require('passport-local').Strategy
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
		callbackURL : 'http://localhost:3000/auth/google/return',
		passReqToCallback : true
	}, function (req, accessToken, refreshToken, profile, done) {
		if (!req.user) {
			User.findOne({ 'google.id' : profile.id }, function (err, user) {
				if (err) {
					return done(err);
				}
				if (!user) {
					user = new User();
					user.email = profile.emails.length > 0 && profile.emails[0].value;
				}
				user.google.id = profile.id;
				user.google.email = profile.emails.length > 0 && profile.emails[0].value;
				user.google.name = profile.displayName;
				user.save(function (err) {
					if (err) {
						throw err;
					}
					done(null, user);
				});
			});
		} else {
			User.findById(req.user._id, function (err, user) {
				if (err) {
					return done(err);
				}
				if (!user) {
					return done('Ghost user?');
				}
				user.google.id = profile.id;
				user.google.email = profile.emails.length > 0 && profile.emails[0].value;
				user.google.name = profile.displayName;
				user.save(function (err) {
					if (err) {
						throw err;
					}
					done(null, user);
				});
			});
		}
	}));

	passport.use(new FacebookStrategy({
		clientID : '1602528199988108',
		clientSecret : 'ea51cee9edf24ef9d9aac702d9f2ba2e',
		callbackURL : 'http://localhost:3000/auth/facebook/return',
		passReqToCallback : true
	}, function (req, accessToken, refreshToken, profile, done) {
		if (!req.user) {
			User.findOne({ 'facebook.id' : profile.id }, function (err, user) {
				if (err) {
					return done(err);
				}
				if (!user) {
					user = new User();
					user.email = profile.emails.length > 0 && profile.emails[0].value;
				}
				user.facebook.id = profile.id;
				user.facebook.email = profile.emails.length > 0 && profile.emails[0].value;
				user.facebook.name = profile.displayName;
				user.save(function (err) {
					if (err) {
						throw err;
					}
					done(null, user);
				});
			});
		} else {
			User.findById(req.user._id, function (err, user) {
				if (err) {
					return done(err);
				}
				if (!user) {
					return done('Ghost user?');
				}
				user.facebook.id = profile.id;
				user.facebook.email = profile.emails.length > 0 && profile.emails[0].value;
				user.facebook.name = profile.displayName;
				user.save(function (err) {
					if (err) {
						throw err;
					}
					done(null, user);
				});
			});
		}
	}));

	passport.use(new LocalStrategy({
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true
	}, function (req, email, password, done) {
		if (!req.user) {
			User.findOne({ 'local.email' : email }, function (err, user) {
				if (err) {
					return done(err);
				}
				if (!user) {
					user = new User();
					user.email = email;
					user.local.email = email;
					user.local.password = user.hashPassword(password);
					user.save(function (err) {
						if (err) {
							throw err;
						}
						done(null, user);
					});
				} else {
					if (user.validPassword(password)) {
						done(null, user);	
					} else {
						done(null, false);
					}
				}
			});
		} else {
			User.findById(req.user._id, function (err, user) {
				if (err) {
					return done(err);
				}
				if (!user) {
					return done('Ghost user?');
				}
				user.local.email = email;
				user.local.password = user.hashPassword(password);
				user.save(function (err) {
					if (err) {
						throw err;
					}
					done(null, user);
				});
			});
		}
	}))	
}