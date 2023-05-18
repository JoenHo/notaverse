var chai = require('chai');
var chaiHttp = require('chai-http');
var async = require('async');

var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

var http = require('http');
const { describe } = require('node:test');
chai.use(chaiHttp);

describe('Test single object', function(){
    var requestResult;
	var response;
		 
    before(function (done) {
        chai.request("http://localhost:3000")
			.get("/user/?userId=42ab8ffd-2367-44fd-9568-87a19134053a")
			.end(function (err, res) {
				requestResult = res.body;
				response = res;
                expect(err).to.be.null;
                expect(res).to.have.status(200);
				done();
			});
        });
    
    it('Should return a user object', function (){
        expect(response).to.have.status(200);
        expect(response.body).to.have.length.lessThanOrEqual(1);
        expect(response).to.have.headers;
    });

    it('The user object has known properties', function(){
	    expect(requestResult[0]).to.include.keys('userId');
		expect(response.body[0]).to.have.property('username');
        expect(response.body[0]).to.have.property('plan');
        expect(response.body[0]).to.have.property('roomIdList');
        expect(response.body[0]).to.have.property('noteIdList');
		expect(response.body).to.not.be.a.string;
	});

    it('The user object has known properties with the correct types', function() {
        expect(requestResult[0]).to.have.property('userId').that.is.a('string');
        expect(response.body[0]).to.have.property('username').that.is.a('string');
        expect(response.body[0]).to.have.property('plan').that.is.a('string');
        expect(response.body[0]).to.have.property('roomIdList').that.is.an('array');
        response.body[0].roomIdList.forEach((roomId) => {
            expect(roomId).to.be.a('string');
        });
        expect(response.body[0]).to.have.property('noteIdList').that.is.an('array');
        response.body[0].noteIdList.forEach((noteId) => {
            expect(noteId).to.be.a('string');
        });
    });

    it('Should update a user', function(done) {
        const updatedUser = {
            userId: '42ab8ffd-2367-44fd-9568-87a19134053a',
            username: 'UpdatedUser',
            plan: 'Business'
        };
        chai.request("http://localhost:3000")
            .put(`/user/${updatedUser.userId}`)
            .send(updatedUser)
            .end(function (err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.include.keys('userId', 'username', 'plan', 'roomIdList', 'noteIdList');
                done();
            });
    });

    // it('Should reject updating a user plan to a value not in the Subscription enum', function(done) {
    //     const userIdToUpdate = '42ab8ffd-2367-44fd-9568-87a19134053a';
    //     const updatedPlan = { plan: 'InvalidPlan' };
    //     chai.request("http://localhost:3000")
    //         .put(`/user/${userIdToUpdate}`)
    //         .send(updatedPlan)
    //         .end(function (err, res) {
    //             expect(res).to.have.status(400);
    //             done();
    //         });
    // });
})