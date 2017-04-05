// Global before and after hooks for mocha to start and stop the server

var app = require('../app');
var http = require('http');
var server;

before(function(done){
    server = http.createServer(app);
    server.listen(3000);        
    server.on('listening', done);
});

after(function(done){
    server.close(done);
});
