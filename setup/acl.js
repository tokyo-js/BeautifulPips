'use strict';

const
	Acl = require('acl')
	, redisClient = require('./redisClient')
	, acl = new Acl(new Acl.redisBackend(redisClient));
	
acl.allow([
	{
		roles : 'member',
		allows : [
			{ resources : '/blogs', permissions : 'get' }
		]
	}
]);

module.exports = acl;