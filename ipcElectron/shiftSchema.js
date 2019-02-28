var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var shiftSchema = new Schema({

    shift: { type: String, required: true }
});

module.exports = mongoose.model('Shift', shiftSchema);