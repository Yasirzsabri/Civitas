require('./db');
const mongoose = require('mongoose');
require('./userLevel');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        // trim:true
    },
    password: String,
    active: Boolean,
    dateAdded: Date,
    lastUpdateDate: Date
});

module.exports = mongoose.model('user', userSchema, 'user');