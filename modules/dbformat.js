const mongoose = require('mongoose');//import mongoose

const entrySchema = mongoose.Schema({
    ip: String,
    agent: String,
    action: String,
    time: Number
});

module.exports = {
    entry: mongoose.model('entry', entrySchema)
}