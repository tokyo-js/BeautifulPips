var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

var acl = require('../setup/acl');

router.get('/blogs', acl.middleware(), function (req, res) {
	res.json({
		msg : 'yes'
	});
});

module.exports = router;
