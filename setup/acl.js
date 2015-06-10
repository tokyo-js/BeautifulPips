'use strict';

const
	Acl = require('Acl')
	, redisClient = require('./redisClient')
	, acl = new Acl(new Acl.redisBackend(redisClient));
	
module.exports = acl;