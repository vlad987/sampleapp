var expect = require('chai').expect;
var sinon = require('sinon');
var request = require('supertest');
var config = require('../config');

//change to testDatabase and port
config.db = 'mongodb://appDatabaseAdmin:password@127.0.0.1:26016/testDatabase';
config.port = 3001;

describe('routes', function(){

    var app;
    var server;

    before(function () {
        app = require('../app');
        delete require.cache[require.resolve('../bin/www')];
        server = require('../bin/www');
    });

    after(function (done) {
        server.close(done);
    });

    //Tests go here

});
