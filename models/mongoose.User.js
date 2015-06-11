'use strict';

const
	mongoose = require('mongoose')
	, UserSchema = mongoose.Schema({
		id : {
			type : String,
			required : true
		},
		email : {
			type : String,
			required : true
		}
	});

module.exports = {
	schema : UserSchema,
	model  : mongoose.model('User', UserSchema)
};