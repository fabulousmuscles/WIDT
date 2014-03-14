var request = require('request');
var Entry = require('../app/models/entry');

describe("The homepage", function() {
    it("should respond with widt", function(done) {
        console.log(process.env.NODE_ENV);
        request("http://localhost:8000", function(error, response, body) {
            expect(response.statusCode).toBe(200);
            expect(body).toContain('WIDT');
            done();
        });
    });
});

describe("The api", function() {

    it("should respond with an empty array if no entries", function(done) {
        request("http://localhost:8000/api/entries", function(error, response, body) {
            expect(body).toBe('[]');
            done();
        });
    });

    var options = {
        url: "http://localhost:8000/api/entries",
        form: {
            text: "hello world!"
        }
    }
    it("should create an entry", function(done) {
        request.post(options, function(error, response, body) {
            done();
        });
    });

    it("should respond with an array of entries if there are any", function(done) {
        request("http://localhost:8000/api/entries", function(error, response, body) {
            expect(body).toContain('hello world!');
            done();
        });
    });

    //it("should delete an entry" function(done) {
});
