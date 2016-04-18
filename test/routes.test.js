var expect = require('chai').expect;
// var sinon = require('sinon');
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
    it('should create new topic on post / and return it', function(done) {
      request(app)
          .post('/api/topics/')
          .send({
              name:'my awesome topic'
          })
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function(err, res) {
              if (err) return done(err);
              expect(res.body).to.be.an('Object');
              expect(res.body._id).to.not.be.an('undefined');
              done();
              });
      });

      it('should create new topic on post / and return it', function(done) {
          request(app)
              .post('/api/topics/')
              .send({
                  name:'my awesome topic'
              })
              .expect(200)
              .expect('Content-Type', /json/)
              .end(function(err, res) {
                  if (err) return done(err);
                  expect(res.body).to.be.an('Object');
                  expect(res.body._id).to.exist;
                  done();
              });
      });

      it('should respond to GET / with an array of topics', function(done) {
          request(app)
            .get('/api/topics/')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
              if (err) return done(err);
              expect(res.body).to.be.a('Array');
              console.log('Got '+res.body.length+' Topics');
              done();
            });
      });


});
