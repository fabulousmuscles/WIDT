var mongoose = require('mongoose');
var Entry = require('../app/models/entry')

describe("mongodb database", function() {

    beforeEach(function() {
        mongoose.connect('mongodb://localhost/testdb');
    });

    afterEach(function() {
        //  how to drop db after all tests complete???
        mongoose.connection.close();
        // mongoose.connection.db.executeDbCommand({
        //     dropDatabase: 1
        // }, function(err, result) {
        //     console.log(err);
        //     console.log(result);
        //     process.exit(0);
        // });
    });

    describe("creating an entry", function() {
        // note the 'done' callback: this is an async test
        it('should save entries', function(done) {
            Entry.create({text : 'foo'}, function(err, entry) {
                    expect(entry.text).toBe('foo');
                    expect(entry.created_at).toBeDefined();
                    expect(entry.modified).toBeDefined();
                    done();
            });
            Entry.create({text : 'bar'}, function(err, entry) {
                    expect(entry.text).toBe('bar');
                    expect(entry.created_at).toBeDefined();
                    expect(entry.modified).toBeDefined();
                    done();
            });
        });
    });

    describe("querying the database", function() {
        it('should retrieve entries', function(done) {
            Entry.find(function(err, entries) {
                expect(entries.length).toEqual(2);
                done();
            });
        });
    });
});
