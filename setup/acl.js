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

acl.addUserRoles('109107447980707024405', 'member');

module.exports = acl;