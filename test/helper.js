// Global before and after hooks for mocha to start and stop the server
require('should');

var app = require('../app');
var http = require('http');
var models =  require('../db/models');

var server;

before(function(done){
    server = http.createServer(app);
    models.sequelize.sync({
        force: true
    }).then(function() {
        models.User.create({
            username: 'admin',
            first_name: 'admin',
            last_name: 'admin',
            password: 'adminpass',
            token: '1234',
            role: 'teacher',
            email: 'admin@example.com'
        }).then(() => {
            server.listen(3000, done);
        });
    }).catch(done);
});

after(function(done){
    return server.close(done);
});
