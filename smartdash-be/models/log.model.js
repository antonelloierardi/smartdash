const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    }
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model('Log', LogSchema);

