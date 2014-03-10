var mongoose = require('mongoose');
var Entry = require('../app/models/entry')

describe("Create an entry", function() {
    beforeEach(function() {
        mongoose.connect('mongodb://localhost/testdb');
    });

    afterEach(function() {
        mongoose.connection.db.executeDbCommand({
            dropDatabase: 1
        }, function(err, result) {
            console.log(err);
            console.log(result);
            process.exit(0);
        });
    });

    // note the 'done' callback: this is an async test
    it('should save to the database', function(done) {
        Entry.create({text : 'hello'}, function(err, entry) {
                expect(entry.text).toBe('hello');
                expect(entry.created_at).toBeDefined();
                expect(entry.modified).toBeDefined();
                done();
        });
    });
});

describe("A suite", function() {
    it("contains spec with an exception", function() {
        expect(true).toBe(true);
    });
});
