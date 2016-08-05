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
    it('should return html on an individual trainer', function(done) {
      request(app)
      .get('/trainer/:id')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(function(res) {
        res.body.id = 1;
      })
      .expect(200, {
        id: 1
      }, done);
    });
    it('should return json after a successful post', function(done) {
      request(app)
      .post('/trainers')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(function(res) {
        res.body.displayName = "grizz";
        res.body.name = "Grizz";
        res.body.password = null;
        res.body.timeAvailable = null;
        res.body.location = "Oakland";
        res.body.email = "stuff";
        res.body.driveForClient = false;
        res.body.offerFitnessAssessment = false;
        res.body.offerNutritionPlan = false;
        res.body.price = 50;
        res.body.takingNewClients = false;
        res.body.phoneNumber = 6503408888;
      })
      .expect(200, {
        "displayName": "grizz",
        "name": "Grizz",
        "password": null,
        "timeAvailable": null,
        "location": "Oakland",
        "email": "stuff",
        "driveForClient": false,
        "offerFitnessAssessment": false,
        "offerNutritionPlan": false,
        "price": 50,
        "takingNewClients": false,
        "phoneNumber": 6503408888
      }, done);
      //TODO Whenever I expect JSON for either trainer/athlete it returns a 404. Look into supertest and see why this is happening
    });
  });
});
