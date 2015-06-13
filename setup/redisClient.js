const
	redisClient = require('redis').createClient();

redisClient.on('ready', function () {
	console.log('Redis is ready');
});

redisClient.on('error', function () {
	console.log('Failed to connect to Redis');
});

module.exports = redisClient;