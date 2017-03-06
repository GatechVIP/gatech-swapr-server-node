// Global before and after hooks for mocha to start and stop the server

var app = require('../app');
var http = require('http');
var server;

beforeEach(function(done){
    server = http.createServer(app);
    server.listen(3000);        
    server.on('listening', done);
});

afterEach(function(done){
    server.close(done);
});
