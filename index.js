'use strict';

var request = require('request');

// Hardcoded URLs
var loginUrl		= "https://web.spaggiari.eu/auth/app/default/AuthApi2.php?a=aLoginPwd";
var regclasseUrl	= "https://web.spaggiari.eu/cvv/app/default/regclasse.php";

/**
 * Logins into the site
 * @param {string} username
 * @param {string} password
 */
module.exports.login = function(username, password, callback) {
	var cookieJar = request.jar();
	request.post({url: loginUrl, jar: cookieJar, form: {"uid": username, "pwd": password}},
	function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var auth = JSON.parse(body).data.auth;
			
			var ret = [];
			ret.loggedIn	= auth.loggedIn;
			ret.accountType	= auth.accountInfo.type;
			ret.id		= auth.accountInfo.id;
			ret.surname	= auth.accountInfo.cognome;
			ret.name	= auth.accountInfo.nome;
			
			if (ret.loggedIn) {
				request.get({url: regclasseUrl, jar: cookieJar},
				function (rcerror, rcresponse, rcbody) {
					if (!rcerror && rcresponse.statusCode == 200) {
						ret.class = rcbody.match(/[1-5]+[A-Z]+/g)[0].substring(0,2);
						callback(ret, error, response, body);
					}
				});
			} else {
				callback(ret);
			}
		}
		else {
			callback(null, error, response, body);
		}
	})
};
