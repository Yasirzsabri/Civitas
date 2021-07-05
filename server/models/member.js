require('./db')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memberSchema = new Schema({
  firstName: String,
  lastName: String,
  address1: String,
  address2: String,
  province: String,
  city: String,
  postalCode: String,
  contactNumber:[
    {
      name: String,
      phoneNumber: String
    },
  ],
  emailAddress:{
    type: String,
    required: true,
    unique: true,
    // trim:true
  },
  communityDetail :[{
    community: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community"
    },
    renewalDate: Date,
    membershipPaidDate: Date,
    memberSince: Date,
  },],
  active: Boolean,
  dateAdded: Date,
  lastUpdateDate: Date
});

module.exports = mongoose.model('Member', memberSchema, 'member');