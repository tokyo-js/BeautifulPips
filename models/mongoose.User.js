'use strict';

const
	mongoose = require('mongoose')
	, UserSchema = mongoose.Schema({
		email : {
			type : String,
			required : true
		},
		google : {
			id : String,
			email : String,
			name : String
		},
		facebook : {
			id : String,
			email : String,
			name : String
		}
	});

UserSchema.virtual('user_id').get(function () {
	return this._id;
});

UserSchema.index({ 'id' : 1 });
UserSchema.index({ 'email' : 1 });
UserSchema.index({ 'google.id' : 1 });
UserSchema.index({ 'google.email' : 1 });

module.exports = {
	schema : UserSchema,
	model  : mongoose.model('User', UserSchema)
};