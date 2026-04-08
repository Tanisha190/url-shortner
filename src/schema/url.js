const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortUrl: {
        type: String,
        required: true,
    },
    longUrl: {
        type: String,
        required: true,
    },
    alias: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    createdBy: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Url', urlSchema);