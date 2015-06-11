var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log(req.session);
	console.log(req.user);
	res.render('index', { title: 'Express' });
});

var acl = require('../setup/acl');

router.get('/blogs', acl.middleware(), function (req, res) {

	console.log(req.url);
	res.json({
		msg : 'yes'
	});
});

module.exports = router;
