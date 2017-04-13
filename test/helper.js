// Global before and after hooks for mocha to start and stop the server

var app = require('../app');
var http = require('http');
var models =  require('../models');

var server;

before(function(done){
    server = http.createServer(app);
    models.sequelize.sync().then(function() {
        server.listen(3000);
        server.on('listening', done);
        /*models.Institute.build({ "name": "Georgia Tech" })
            .save()
            .then(function(savedInstitute) {
                console.log("Good");
                console.log(savedInstitute);
            }).catch(function(error) {
                console.log("Bad");
                console.log(error);
            })*/
    });

});

after(function(done){
    server.close(done);
});
