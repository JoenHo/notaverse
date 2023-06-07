var chai = require('chai');
var chaiHttp = require('chai-http');
var async = require('async');

var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

var http = require('http');
const { describe } = require('node:test');
chai.use(chaiHttp);
var address = 'https://ntverse.azurewebsites.net'

var newUser = { oauthId: '123', plan: 'Business' };

describe('Test User Lifecycle', function() {
    var createdUser;

    it('Should create a new user', function(done) {
        chai.request(address)
            .post('/user')
            .send(newUser)
            .end(function(err, res) {
                expect(res).to.have.status(200);
                createdUser = res.body;
                expect(createdUser).to.include(newUser);
                done();
            });
    });

    it('Should refuse to create a new user with an invalid plan', function(done) {
        const newUser = {
            oauthId: '456',
            plan: 'InvalidPlan'
        };
        chai.request(address)
            .post(`/user/`)
            .send(newUser)
            .end(function (err, res) {
                expect(res).to.have.status(500);
                done();
            });
    }); 


    it('Should delete the user', function(done) {
        chai.request(address)
            .delete(`/user/${createdUser.userId}`)
            .end(function(err, res) {
                expect(res).to.have.status(200);
                done();
            });
    });
});