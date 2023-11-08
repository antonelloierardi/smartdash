const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    companyID: {
      type: String,
      required: false
    },
    company: {
      type: String,
      required: false
    },
    photo: {
      type: String,
      required: false
    },
    name: {
      type: String,
      required: true
    },
    surname: {
      type: String,
      required: true
    },
    position: {
      type: String,
      required: true
    },
    site: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    cap: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    province: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please enter a valid email'
      ]
    },
    tel: {
      type: String,
      required: false,
      /* match: [/^[1-9][0-9]{10,}$/, 'Please enter a valid number'] */
    },
    mobile: {
      type: String,
      required: false,
      //match: [/^[1-9][0-9]{9}$/, 'Please enter a valid number']
    },
    hashedPassword: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    role: {
        type: String,
        required: false
    },
    
    status: {
        type: String,
        required: false
    }
  },
  {
    versionKey: false
  }
);

module.exports = mongoose.model('User', UserSchema);
