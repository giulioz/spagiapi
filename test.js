var spagiapi = require("./index.js");

spagiapi.login(process.argv[2], process.argv[3], function(data, err, res) {
	console.log(data);
	console.log(res);
});
