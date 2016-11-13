# spagiapi
An API for accessing data on the [Spaggiari registro elettronico](http://web.spaggiari.eu/) site
# Usage
This API can login into the site and retrive the user data
```js
var spagiapi = require("spagiapi");

spagiapi.login(username, password, function(data) {
        console.log(data);
});
```
This returns an object:
```json
{ loggedIn: true,
  accountType: 'S',
  id: 1105043,
  surname: 'ZAUSA',
  name: 'GIULIO',
  class: '5C' }
```
