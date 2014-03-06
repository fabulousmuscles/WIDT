var mongoose = require('mongoose'); 
                               
var Schema = mongoose.Schema;
var Entry = new Schema({
    text      : String,
    date      : { type: Date, default: Date.now }
});
module.exports = mongoose.model('Entry', Entry);
