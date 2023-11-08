const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema(
  {
    logo: {
      type: String,
      required: false,
    },
    nameCompany: {
      type: String,
      required: false,
    },
    legalSite: {
      type: Object,
    },
    operatingOffices: {
      type: Array,
    },
    vatNumber: {
      type: String,
      required: false,
    },
    taxCode: {
      type: String,
      required: false,
    },
    rea: {
      type: String,
      required: false,
    },
    webSite: {
      type: String,
      required: false,
    },
    pec: {
      type: String,
      required: false,
    },
    iban: {
      type: String,
      required: false,
    },
    details: {
      type: Object,
    },
    createdAt: {
      type: Date,
      required: false,
    },
  },
  {
    versionKey: false,
  }
);
module.exports = mongoose.model("Company", CompanySchema);
