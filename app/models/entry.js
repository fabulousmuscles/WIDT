var mongoose = require('mongoose'); 
                               
module.exports = mongoose.model('Entry', {
    text : String
});
