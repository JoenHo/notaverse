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

describe('Test HTTP POST', function(){
    var requestResult;
	var response;
		 
    before(function (done) {
        chai.request(address)
			.get("/user")
			.end(function (err, res) {
				requestResult = res.body;
				response = res;
                expect(err).to.be.null;
                expect(res).to.have.status(200);
				done();
			});
        });
    

    it('Should refuse to create a new user with an invalid plan', function(done) {
        const newUser = {
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
})