var mongoose = require('mongoose'); 
                               
var Schema = mongoose.Schema;
var Entry = new Schema({
    text          : { type: String, required: true },
    categories    : [],
    created_at    : { type: Date, default: Date.now },
    modified      : { type: Date, default: Date.now }
});
module.exports = mongoose.model('Entry', Entry);
