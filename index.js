'use strict';

var request = require('request');

/**
 * Logins into the site
 * @param {string} username
 * @param {string} password
 * @return {string}
 */
module.exports.login = function(username, password) {
	request('http://www.google.com', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			return(body);
		}
	})
};

console.log(module.exports.login("",""));
