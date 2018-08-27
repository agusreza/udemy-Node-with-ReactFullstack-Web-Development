// keys.js
if (process.env.NODE_ENV == 'production') {
	// berarti ini di production
	module.exports = require('./prod');
} else {
	// berarti ini di development environtment
	module.exports = require('./dev');
}
