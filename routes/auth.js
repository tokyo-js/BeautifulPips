const
	express = require('express')
	, router = express.Router()
	, passport = require('passport');

router.get('/google/:return?', passport.authenticate('google', {
	successRedirect : '/',
	scope : ['email']
}));

router.get('/facebook/:return?', passport.authenticate('facebook', {
	successRedirect : '/',
	scope : ['email']
}));

router.get('/logout', function (req,res) {
	req.logout();
	res.redirect('/');
});

router.get('/secure', function (req, res) {
	if (req.isAuthenticated()) {
		return res.json({
			msg : 'ok'
		});
	}
	res.json({
		msg : 'not ok'
	});
});

module.exports = router;