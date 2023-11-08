const mongoose = require("mongoose");

const CitySchema = new mongoose.Schema(
  {
    comune: {
      type: String,
      required: false,
    },
    provincia: {
      type: String,
      required: false,
    },
    sigla: {
      type: String,
      required: false,
    },
    regione: {
      type: String,
      required: false,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("City", CitySchema);
