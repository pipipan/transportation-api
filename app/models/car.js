/**
 * Mongoose Schema for the Entity Car
 * @author Clark Jeria
 * @version 0.0.3
 */

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CarSchema   = new Schema({
    make: {
        required: true,
        type: String,
        maxlength: 18
    },
    model: {
        required: true,
        type: String,
        maxlength: 18
    },
    license: {
        required: true,
        type: String,
        maxlength: 10
    },
    doorCount: {
        required: true,
        type: Number,
        min: 1,
        max: 8
    },
    driver: {
        type: Schema.Types.ObjectId, ref: 'Driver'
    }
});

module.exports = mongoose.model('Car', CarSchema);
