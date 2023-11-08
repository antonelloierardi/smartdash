const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema(
  {
    photo: {
      type: String,
      required: false,
    },
    data: {
      type: String,
      required: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

/* 
const ClientiSchema = new mongoose.Schema(
    {
        photo: {
            type: String
        },
        name: {
            type: String
        },
        surname: {
            type: String
        },
        nameCompany: {
            type: String
        },
        type: {
            type: String
        },
        address: {
            type: String
        },
        cap: {
            type: String
        },
        city: {
            type: String
        },
        tel: {
            type: String,
            required: false,
            match: [/^[1-9][0-9]{9}$/, 'Please enter a valid tel number']
        },
        email: {
            type: String
            required: true,
            unique: true,
            match: [
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                'Please enter a valid email'
            ]
        },
        mobile: {
            type: String
            required: false,
            match: [/^[1-9][0-9]{9}$/, 'Please enter a valid mobile number']
        },
        legalSite: {
            type: String
        },
        operatingOffices: {
            type: String
        },
        vatNumber: {
            type: String
        },
        taxCode: {
            type: String
        },
        webSite: {
            type: String
        },
        rea: {
            type: String
        },
        pec: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
    },
    {
        versionKey: false
    }
); */

module.exports = mongoose.model("Client", ClientSchema);
