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
        Entry.create({text : req.body.text}, function(err, entry) {
            if (err) {
                res.send(err);
            } else {
                res.send(entry);                
            }
        });

    });

    // delete an entry
    app.delete('/api/entries/:entry_id', function(req, res) {
        Entry.remove({_id : req.params.entry_id}, function(err, entry) {
            if (err) {
                res.send(err);
            } else {
                // sends response code: 0 for fail, 1 for success
                res.send(entry);                
            }
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
            if (err) {
                res.send(err);
            } else {
                res.send(category);
            }
        });

    });
    app.delete('/api/categories/:category_id', function(req, res) {
        Category.remove({_id : req.params.category_id}, function(err, category) {
            if (err) {
                res.send(err);
            } else {
                res.send(category);
            }
        });
    });

    // application
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html');
    });
};
