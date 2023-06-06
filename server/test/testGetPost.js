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

describe('Test single object', function(){
    var requestResult;
	var response;
		 
    before(function (done) {
        chai.request(address)
			.get("/user/?userId=647ea09736d34037c536bceb")
			.end(function (err, res) {
				requestResult = res.body;
				response = res;
                expect(err).to.be.null;
                expect(res).to.have.status(200);
				done();
			});
        });
    
        
    it('Should return users with a specific plan', function(done) {
        var plan = 'Business';
        chai.request(address)
            .get(`/user/plan/${plan}`)
            .end(function (err, res) {
                expect(res).to.have.status(200);
                res.body.forEach(user => {
                    expect(user).to.have.property('plan').that.equals(plan);
                });
                done();
            });
    });

    it('Should refuse to create a new user with an invalid plan', function(done) {
        const newUser = {
            //userId: 'newUserId',
            username: 'NewUser',
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