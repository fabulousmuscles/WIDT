// modified from: https://github.com/klokoy/jasmine-node-mongo-test
// Not sure if these tests are necessary as they seem to just be 
// testing whether mongoose and mongodb are working properly, and 
// not testing anything specific with my model.
// If I added something like a custom method to the model, then that
// should be tested. But as the models are now, testing probably isn't nec.
// Also note that the db persists all the way through, which means these
// aren't realllly unit tests.

var mongoose = require('mongoose');
var Entry = require('../app/models/entry')

describe("mongoose entry model", function() {

    beforeEach(function() {
        mongoose.connect('mongodb://localhost/testdb');
    });

    afterEach(function() {
        mongoose.connection.close();
    });

     it('should be save-able', function(done) {
         Entry.find(function(err, entries) {
             expect(err).toBeNull();
             expect(entries.length).toEqual(0);
             done();
         });
         Entry.create({text : 'foo'}, function(err, entry) {
             expect(err).toBeNull();
             expect(entry.text).toBe('foo');
             expect(entry.created_at).toBeDefined();
             expect(entry.modified).toBeDefined();
             done();
         });
         Entry.create({text : 'bar'}, function(err, entry) {
             expect(err).toBeNull();
             expect(entry.text).toBe('bar');
             expect(entry.created_at).toBeDefined();
             expect(entry.modified).toBeDefined();
             done();
         });
     });
    

     it('should be retrievable', function(done) {
         Entry.find(function(err, entries) {
             expect(err).toBeNull();
             expect(entries.length).toEqual(2);
             done();
         });
     });
    

     it('should be update-able', function(done) {
         Entry.create({text : 'bar'}, function(err, entry) { 
             entry.text = 'baz';
             entry.modified = new Date;
             entry.save(function(err, updatedEntry) {
                 expect(err).toBeNull();
                 expect(updatedEntry.text).toBe('baz');
                 expect(updatedEntry.created_at).toBeDefined();
                 expect(updatedEntry.modified).toBeDefined();
                 done(); 
             });
         });
     });
    

     it('should be removable', function(done) {
         Entry.find(function(err, entries) {
             expect(err).toBeNull();
             expect(entries.length).toEqual(3);
             done();
         });
         Entry.create({text : 'bar'}, function(err, entry) { 
             Entry.remove(entry.id, function(err, result) {
                 expect(err).toBeNull();
                 expect(result).toBe(1);
                 done();
             });
         });
         Entry.find(function(err, entries) {
             expect(err).toBeNull();
             expect(entries.length).toEqual(3);
             done();
         });
     });
});
