var Entry = require('./models/entry');
var Category = require('./models/category'); 

module.exports = function(app) {

    // API
    // get all WIDT entries
    app.get('/api/entries', function(req, res) {
        // use mongoose to get all entries in the database
            Entry.find(function(err, entries) {
            if (err)           
                res.send(err)  
            res.json(entries); 
        });                    
    });

    // create an entry
    app.post('/api/entries', function(req, res) {
        Entry.create({
            text : req.body.text, 
            categories : req.body.categories
            }, function(err, entry) {
            err ? res.send(err) : res.send(entry);
            });
    });

    //update an enrty
    app.put('/api/entries', function(req, res) {
        Entry.findById(req.body._id, function(err, entry) {
            if (err) {
                res.send(err);
            } else {
                entry.text = req.body.text;
                entry.modified = new Date;
                entry.save(function(err, updatedEntry) {
                    err ? res.send(err) : res.send(updatedEntry);
                });
            }
        });
    });

    // delete an entry
    app.delete('/api/entries/:entry_id', function(req, res) {
        Entry.remove({_id : req.params.entry_id}, function(err, result) {
            err ? res.send(err) : res.send(result);
        });
    });

    // categories 
    app.get('/api/categories', function(req, res) {
        Category.find(function(err, categories) {
            if (err)
                res.send(err)
            res.json(categories);
        });
    });
    app.post('/api/categories', function(req, res) {
        Category.create({text : req.body.text}, function(err, category) {
            err ? res.send(err) : res.send(category);
        });

    });
    app.delete('/api/categories/:category_id', function(req, res) {
        Category.remove({_id : req.params.category_id}, function(err, category) {
            err ? res.send(err) : res.send(category);
        });
    });

    // application
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html');
    });
};
