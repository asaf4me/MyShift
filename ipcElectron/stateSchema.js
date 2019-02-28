var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StatetSchema = new Schema({

    state: { type: Boolean }
});

module.exports = mongoose.model('State', StatetSchema);