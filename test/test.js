'use strict';

var expect = require('chai').expect;
var spagiapi = require('../index');

describe('#spagiapi', function() {
    it('makes the request', function() {
        var result = spagiapi.login("", "");
        expect(result).to.equal();
    });
});
