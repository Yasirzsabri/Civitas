require('./db');
const mongoose = require('mongoose');
require('./userLevel');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userId:{
        type: String,
        required: true,
        unique: true,
        // trim:true
    },
    password: String,
    userLevel:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "userLevel" 
    },],
    active: Boolean,
    dateAdded: Date,
    lastUpdateDate: Date
});

module.exports = mongoose.model('user', userSchema, 'user');