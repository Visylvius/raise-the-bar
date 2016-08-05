var mocha = require ('mocha');
var chai = require('chai');
var expect = chai.expect;
var morgan = require('morgan');
var request = require('supertest');
var express = require('express');
const url = 'http://localhost:4000/api';
var app = require('../server');

describe('API Test', function () {
  describe('Athlete API', function() {
    it('it should return html on the /findathletes endpoint', function (done) {
      request(app)
      .get('/findathletes')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(200, done);
    });
    it('it should return html on an individualathlete', function(done) {
      request(app)
      .get('/athlete/:id')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(function(res) {
        res.body.id= 1;
      })
      .expect(200, {
        id: 1
      }, done);
    });
    // it('it should fail if not passed an integer as the id', function(done) {
    //   request(app)
    //   .get('/athlete/:id')
    //   .expect('Content-Type', 'text/html; charset=utf-8')
    //   .expect(function(res) {
    //     res.body.id = 1 + 'some string'
    //   })
    //   .expect
    // })
    it('it should fail if not text/html', function (done) {
      request(app)
      .get('/findathletes')
      .expect('Content-Type', /json/)
      .expect(200, function(err) {
        expect(err).to.exist;
        done();
      });
    });
  });
});
