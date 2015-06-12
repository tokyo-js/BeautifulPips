'use strict';

const
	restful = require('node-restful')
	, UserSchema = require('../models/mongoose.User').schema
	, express = require('express')
	, router = express.Router()
	, User = restful.model('User', UserSchema).methods(['get', 'post', 'put', 'delete'])
	, onlyCanModifyOwnStuff = function (req, res, next) {
		if (req.user && req.user._id === req.params.id) {
			return next();
		}
		return next(Error('Not authorized'));
	};

User.before('put', onlyCanModifyOwnStuff);

User.register(router, '/users');

module.exports = router;