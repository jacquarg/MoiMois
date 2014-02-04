var assert = require("assert");
var GeolocationLog = require("../../server/models/utils");

describe('GeolocationLog', function(){
  describe('#computeDistance()', function(){
    it('blablabla', function(){
      assert.equal(23.226991, GeolocationLog.computeDistance({ longitude: 2.5010204315185547, latitude: 49.040744988409365 },
        {longitude: 2.387208938598633, latitude: 48.84580368138393}));


      assert.equal(4.669548, GeolocationLog.computeDistance(
        { longitude:  2.339658737182617, latitude: 48.873699065559684},
        {longitude: 2.387208938598633, latitude: 48.84580368138393}
        ));
      
      
    })
  })
})
