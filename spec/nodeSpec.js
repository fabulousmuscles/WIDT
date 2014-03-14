var request = require('request');

describe("The homepage", function() {
    it("should respond with widt", function(done) {
        request("http://localhost:8000", function(err, response, body) {
            expect(err).toBeNull();
            expect(response.statusCode).toBe(200);
            expect(body).toContain('WIDT');
            done();
        });
    });

    it("should be redirected to with invalid url", function(done) {
        request({url:"http://localhost:8000/foo", followRedirect:false}, function(err, response, body) {
            expect(err).toBeNull();
            expect(response.statusCode).toBe(302);
            expect(response.headers.location).toBe('/');
            done();
        });

        request({url:"http://localhost:8000/api/", followRedirect:false}, function(err, response, body) {
            expect(err).toBeNull();
            expect(response.statusCode).toBe(302);
            expect(response.headers.location).toBe('/');
            done();
        });
    });

}); 

describe("The api", function() {

    it("should respond with an empty array if no entries", function(done) {
        request("http://localhost:8000/api/entries", function(err, res, body) {
            expect(err).toBeNull();
            expect(body).toBe('[]');
            done();
        });
    });

    it("should create an entry", function(done) {
        var options = {
            url: "http://localhost:8000/api/entries",
            form: {text: "foo"}
        }
        request.post(options, function(err, res, body) {
            expect(err).toBeNull();
            expect(body).toContain('foo')
            done();
        });
    });

    it("should respond with an entry if there is one", function(done) {
        request("http://localhost:8000/api/entries", function(err, res, body) {
            expect(err).toBeNull();
            expect(body).toContain('foo');
            expect(body).toNotContain('bar');
            done();
        });
    });

    it("should create another entry", function(done) {
        var options2 = {
            url: "http://localhost:8000/api/entries",
            form: {text: "bar"}
        }
        request.post(options2, function(err, res, body) {
            expect(err).toBeNull();
            expect(body).toContain('bar')
            done();
        });
    });

    it("should respond with an array of entries", function(done) {
        request("http://localhost:8000/api/entries", function(err, res, body) {
            expect(err).toBeNull();
            expect(body).toContain('foo');
            expect(body).toContain('bar');
            done();
        });
    });

    it("should delete entries", function(done) {
        var re = /_id": "(.*?)"/g
        request("http://localhost:8000/api/entries", function(err, res, body) {
            expect(err).toBeNull();
            // get the entry ids
            id1 = body.match(re)[0].replace('_id": ', '').replace(/\"/g, '');
            id2 = body.match(re)[1].replace('_id": ', '').replace(/\"/g, '');
            var options1 = {url: "http://localhost:8000/api/entries/" + id1}
            // delete the first entry
            request.del(options1, function(err, res, body) {
                expect(err).toBeNull();
                var options2 = {url: "http://localhost:8000/api/entries/" + id2}
                // delete the second entry
                request.del(options2, function(err, res, body) {
                    request("http://localhost:8000/api/entries", function(err, res, body) {
                        expect(err).toBeNull();
                        expect(body).toNotContain('foo');
                        expect(body).toNotContain('bar');
                        done();
                    });
                });
            });
        });
    });

    it("be empty", function(done) {
        request("http://localhost:8000/api/entries", function(err, res, body) {
            expect(err).toBeNull();
            expect(body).toBe('[]');
            done();
        });
    });
});
