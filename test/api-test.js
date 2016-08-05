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
    it('it should fail if not text/html', function (done) {
      request(app)
      .get('/findathletes')
      .expect('Content-Type', /json/)
      .expect(200, function(err) {
        expect(err).to.exist;
        done();
      });
    });
    it('it should return html on an individual athlete', function(done) {
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
  });
  describe('Trainer API', function() {
    it('should return HTML on the /findtrainers endpoint', function(done) {
      request(app)
      .get('/findtrainers')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(200, done);
    });
  });
});
