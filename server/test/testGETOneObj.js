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

describe('Test HTTP GET single object', function(){
    var requestResult;
	var response;
		 
    before(function (done) {
        chai.request(address)
			.get("/user/46cd2fed-5792-38je-1864-28o85734203c")
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
        expect(response.body).is.not.null;
        expect(response).to.have.headers;
    });

    it('The user object has known properties', function(){
	    expect(requestResult).to.include.keys('userId');
        expect(response.body).to.have.property('plan');
        expect(response.body).to.have.property('roomIdList');
        expect(response.body).to.have.property('noteIdList');
		expect(response.body).to.not.be.a.string;
	});

    it('The user object has known properties with the correct types', function() {
        expect(requestResult).to.have.property('userId').that.is.a('string');
        expect(response.body).to.have.property('plan').that.is.a('string');
        expect(response.body).to.have.property('roomIdList').that.is.an('array');
        response.body.roomIdList.forEach((roomId) => {
            expect(roomId).to.be.a('string');
        });
        expect(response.body).to.have.property('noteIdList').that.is.an('array');
        response.body.noteIdList.forEach((noteId) => {
            expect(noteId).to.be.a('string');
        });
    });

    // it('Should update a user', function(done) {
    //     const updatedUser = {
    //         userId: '46cd2fed-5792-38je-1864-28o85734203c',
    //         username: 'UpdatedUser',
    //         plan: 'Business'
    //     };
    //     chai.request(address)
    //         .put(`/user/${updatedUser.userId}`)
    //         .send(updatedUser)
    //         .end(function (err, res) {
    //             expect(res).to.have.status(200);
    //             expect(res.body).to.include.keys('userId', 'username', 'plan', 'roomIdList', 'noteIdList');
    //             done();
    //         });
    // });

    // it('Should reject updating a user plan to a value not in the Subscription enum', function(done) {
    //     const userIdToUpdate = '46cd2fed-5792-38je-1864-28o85734203c';
    //     const updatedPlan = { plan: 'InvalidPlan' };
    //     chai.request(address)
    //         .put(`/user/${userIdToUpdate}`)
    //         .send(updatedPlan)
    //         .end(function (err, res) {
    //             expect(res).to.have.status(500);
    //             done();
    //         });
    // });
})