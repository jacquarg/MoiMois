var assert = require("assert");
var Utils = require("../../server/models/utils");

describe('formatPhoneNumber', function(){
    it('blablabla', function(){
      assert.equal(Utils.formatPhoneNumber("33670590891"), "+33 6 70 59 08 91");     
      
    });
});
