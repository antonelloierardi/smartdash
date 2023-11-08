const mongoose = require('mongoose');

const AgendaSchema = new mongoose.Schema(
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
    },
    completed: {
      type: Boolean,
      required: true,
    }
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model('Agenda', AgendaSchema);
