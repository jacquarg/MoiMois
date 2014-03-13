var americano = require('americano');

var port = process.env.PORT || 9250;
americano.start({name: 'moi', port: port}
, 
    function(app, server) {
        // Compute new moi, after americano's setup.
        require('./server/models/editionofmoi').touch();
    }
);
