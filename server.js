var americano = require('americano');

var port = process.env.PORT || 9250;
americano.start({name: 'moimois', port: port}
,
    function(app, server) {
        require('./server/models/utils').touch();

        // Compute new moi, after americano's setup.
        require('./server/models/editionofmoi').touch();
    }
);
