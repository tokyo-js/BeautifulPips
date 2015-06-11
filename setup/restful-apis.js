'use strict';

const
	restful = require('node-restful')
	, UserSchema = require('../models/mongoose.User').schema
	, express = require('express')
	, router = express.Router()
	, User = restful.model('User', UserSchema).methods(['get', 'post', 'put', 'delete']);

User.before('put', function (req, res, next) {
	if (req.params.id == '5579614189ef6f1034d562c2') {
		return next();
	}
	return next('wrong');
});

User.register(router, '/users');

module.exports = router;