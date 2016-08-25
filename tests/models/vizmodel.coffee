should = require('chai').Should()
#Client = require('request-json').JsonClient

VizModel = require('../../server/models/vizmodel')

#client = new Client "http://localhost:8888/"

#instantiateApp = require '../server'
#app = instantiateApp()

describe "Test section", ->

#    before (done) ->
#        app.listen 8888
#        done()

#    after (done) ->
#        app.compound.server.close()
#        done()

#    it "Then it succeeds", ->
#        "ok".should.equal "ok"

    it "Compute bank operations", (done)->
        cb = (err, viz) ->
            should.not.exist err
            console.log viz
            done()

        VizModel._computeBankOperations MockData, cb



MockData = [
    {
    "_id": "6856feaa86ba14300e550672e400e0b5",
    "amount": -21.18,
    "bankAccount": "2531",
    "date": "2016-01-02T00:00:00.000Z",
    "dateImport": "2016-08-11T14:49:47.000Z",
    "docType": "bankoperation",
    "raw": "ESPA Indirect Energie SARL",
    "title": "Indirect Energie",
    "operationType": "type.check",
    },
    {
    "_id": "8c6ca508848a87bfcab116ecc2001ff6",
    "amount": -11.92,
    "bankAccount": "2531",
    "date": "2016-01-06T00:00:00.000Z",
    "dateImport": "2016-08-18T06:34:43.000Z",
    "docType": "bankoperation",
    "operationTypeID": "b24a4f14e7f1a2ee3b507b2ba900f5d5",
    "raw": "Paiement sans contact Macdollars",
    "title": "MacDollars PSC",
    "operationType": "type.card",
    },
    {
    "_id": "6856feaa86ba14300e550672e400bb6c",
    "amount": -7.9,
    "bankAccount": "2531",
    "date": "2016-01-08T00:00:00.000Z",
    "dateImport": "2016-08-11T14:49:47.000Z",
    "docType": "bankoperation",
    "operationTypeID": "b24a4f14e7f1a2ee3b507b2ba900d6c1",
    "raw": "CB Spotifaille London",
    "title": "CB Spotifaille",
    "operationType": "type.card",
    },
    {
    "_id": "6856feaa86ba14300e550672e400e758",
    "amount": -43.46,
    "bankAccount": "2531",
    "binary": {"fileName":"__dev_example_file"},
    "date": "2016-01-08T00:00:00.000Z",
    "dateImport": "2016-08-11T14:49:47.000Z",
    "docType": "bankoperation",
    "raw": "CB NOGO Sport",
    "title": "NOGO Sport",
    "operationType": "type.card",
    },
    {
    "_id": "ccc54fab54837ffbd62c041003002968",
    "amount": -24.05,
    "bankAccount": "2531",
    "date": "2016-01-08T00:00:00.000Z",
    "dateImport": "2016-08-22T12:37:55.000Z",
    "docType": "bankoperation",
    "raw": "Prelevement impots fonciers numero reference\n 47839743892 client 43278437289",
    "title": "Impots fonciers",
    "operationType": "type.check",
    },
    {
    "_id": "8c6ca508848a87bfcab116ecc200171f",
    "amount": -25.99,
    "bankAccount": "2531",
    "binary": {"fileName":"__dev_example_file"},
    "date": "2016-01-09T00:00:00.000Z",
    "dateImport": "2016-08-18T06:34:43.000Z",
    "docType": "bankoperation",
    "operationTypeID": "b24a4f14e7f1a2ee3b507b2ba901141f",
    "raw": "Paiement sans contact Rapide",
    "title": "Rapide PSC",
    "operationType": "type.card",
    },
    {
    "_id": "d8be8991722de6151d9b54c6b30026aa",
    "amount": 145.75,
    "bankAccount": "2531",
    "date": "2016-01-21T00:00:00.000Z",
    "dateImport": "2016-08-23T07:21:49.000Z",
    "docType": "bankoperation",
    "raw": "VIR Nuage Douillet REFERENCE Salaire",
    "title": "VIR Nuage Douillet",
    "operationType": "type.payback",
    }

]