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

			// If there are more than one student per account
			if (auth.verified && !auth.loggedIn) {
				var pfolio = JSON.parse(body).data.pfolio;
				var ret = [];
				ret.selection	= true;
				ret.users = [];
				pfolio.fullList.forEach(function(item,i){
					ret.users.push({name: item.nome, uid: item.account_string});
				});
				callback(ret, error, response);
			}
			// Only one user
			else {
				var ret = [];
				ret.verified	= auth.verified;
				ret.loggedIn	= auth.loggedIn;
				ret.accountType	= auth.accountInfo.type;
				ret.id			= auth.accountInfo.id;
				ret.surname		= auth.accountInfo.cognome;
				ret.name		= auth.accountInfo.nome;
				
				if (ret.loggedIn) {
					request.get({url: regclasseUrl, jar: cookieJar},
					function (rcerror, rcresponse, rcbody) {
						if (!rcerror && rcresponse.statusCode == 200) {
							ret.class = rcbody.match(/[1-5]+[A-Z]+/g)[0].substring(0,2);
							ret.school = rcbody.match(/<span class=\"scuola\">(.*?)<\/span>/g)[0];
							ret.school = ret.school.substring(21, ret.school.length - 7);
							callback(ret, error, response);
						}
					});
				} else {
					callback(null, error, response);
				}
			}
		}
		else {
			callback(null, error, response);
		}
	})
};
