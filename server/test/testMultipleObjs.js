var chai = require('chai');
var chaiHttp = require('chai-http');
var async = require('async');

var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

var http = require('http');
const { describe } = require('node:test');
chai.use(chaiHttp);

describe('Test list objects', function(){
    var requestResult;
	var response;
		 
    before(function (done) {
        chai.request("http://localhost:3000")
			.get("/note")
			.end(function (err, res) {
				requestResult = res.body;
				response = res;
                expect(err).to.be.null;
                expect(res).to.have.status(200);
				done();
			});
        });
    
    it('Should return an array object with more than 1 object', function (){
        expect(response).to.have.status(200);
        expect(response.body).to.have.length.above(2);
        expect(response).to.have.headers;
    });

    it('The first entry in the array has known properties', function(){
	    expect(requestResult[0]).to.include.keys('noteId');
	    expect(requestResult[0]).to.have.property('title');
		expect(response.body[0]).to.have.property('img_url');
        expect(response.body[0]).to.have.property('content');
        expect(response.body[0]).to.have.property('userId');
		expect(response.body).to.not.be.a.string;
	});

    it('All the entry in the array have known properties with the correct types', function() {
        requestResult.forEach(function(note) {
            expect(note.noteId).to.be.a('string');
            expect(note.title).to.be.a('string');
            expect(note.img_url).to.be.a('string');
            expect(note.content).to.be.a('string');
            expect(note.userId).to.be.a('string');
        });
    });

    it('No two notes have the same noteId', function() {
        const noteIds = requestResult.map(note => note.noteId);
        const uniqueNoteIds = [...new Set(noteIds)];
        expect(noteIds).to.have.lengthOf(uniqueNoteIds.length);
    });

    it('No note has an img_url, title or content property that is an empty string', function() {
        requestResult.forEach(function(note) {
            expect(note.img_url).to.not.be.empty;
            expect(note.title).to.not.be.empty;
            expect(note.content).to.not.be.empty;
        });
    });

    it('Every note has an associated User', function(done) {
        async.each(requestResult, function(note, callback) {
            chai.request("http://localhost:3000")
                .get(`/user/${note.userId}`)
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    callback();
                });
        }, done);
    });

    const uuidPattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    it('UserId matches a format of a valid UUID', function() {
        requestResult.forEach(function(note) {
            expect(note.userId).to.match(uuidPattern);
        });
    });
})