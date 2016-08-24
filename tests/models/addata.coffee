should = require('chai').Should()
mockery = require 'mockery'

AdData = null


describe "Test section", ->

    before (done) ->
        mockery.enable
            warnOnReplace: false
            warnOnUnregistered: false
            useCleanCache: true

        mockery.registerMock './geolocationlog', 
            hasDocuments: (cb) -> cb null, false

        mockery.registerMock './bankoperation', 
            hasDocuments: (cb) -> cb null, true

        AdData = require('../../server/models/addata')
        done()

    after (done) ->
        mockery.deregisterAll()
        mockery.disable()
        done()

#    it "Then it succeeds", ->
#        "ok".should.equal "ok"

    it "Generate Ads", (done)->

        cb = (err, ads) ->
            should.not.exist err
            should.exist ads
            ads.length.should.eq 1
            if ads[0]
                ads[0].origin.should.equal 'orange'

            done()

        AdData.all cb
