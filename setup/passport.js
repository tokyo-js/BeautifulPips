module.exports = function () {
	const
		passport = require('passport')
		, GoogleStrategy = require('passport-google-openidconnect').Strategy;

	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		console.log(id);
		done(null, { id : id });
	});

	passport.use(new GoogleStrategy({
		clientID : '1029490117085-k72kbs602blcdh3sjaf11tb3qi7n7l36.apps.googleusercontent.com',
		clientSecret : 'Mlm-YqHgDkc2v1BiCcQL8wZ0',
		callbackURL : 'http://localhost:3000/auth/google/return',
		skipUserProfile : true
	}, function (iss, sub, profile, accessToken, refreshToken, done) {
		done(null, profile);
	}));
}