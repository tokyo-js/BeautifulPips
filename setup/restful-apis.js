'use strict';

const
	restful = require('node-restful')
	, UserSchema = require('../models/mongoose.User').schema
	, express = require('express')
	, router = express.Router()
	, User = restful.model('User', UserSchema).methods(['get', 'post', 'put', 'delete'])
	, onlyCanModifyOwnStuff = function (Model) {
		return function (req, res, next) {
			Model.findById(req.params.id, function (err, model) {
				if (err) {
					return next(Error(err));
				}
				if (!model
					|| !req.user) {
					return next(Error('Not authorized'));
				}
				if (model.user_id != req.user._id) {
					return next(Error('Not authorized'));
				}
				next();
			});
		}
	}

User.before('put', onlyCanModifyOwnStuff(User));

User.register(router, '/users');

module.exports = router;