'use strict';

const
	mongoose = require('mongoose')
	, bcrypt = require('bcrypt-nodejs')
	, UserSchema = mongoose.Schema({
		email : {
			type : String,
			required : true
		},
		local : {
			email : String,
			password : String,
			name : String
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

UserSchema.methods.hashPassword = function (password) {
	return bcrypt.hashSync(password);
}

UserSchema.methods.validPassword = function (password) {
	return bcrypt.compareSync(password, this.local.password);
}

UserSchema.index({ 'id' : 1 });
UserSchema.index({ 'email' : 1 });
UserSchema.index({ 'google.id' : 1 });
UserSchema.index({ 'google.email' : 1 });

module.exports = {
	schema : UserSchema,
	model  : mongoose.model('User', UserSchema)
};