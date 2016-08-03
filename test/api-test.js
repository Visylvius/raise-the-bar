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
    it('it should perform all requests methods correctly', function (done) {
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
  });
});
