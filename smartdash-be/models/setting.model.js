const mongoose = require("mongoose");

const SettingSchema = new mongoose.Schema(
  {
    companyID: {
      type: String,
      required: false,
    },
    userID: {
      type: String,
      required: false,
    },
    settingsHeader: {
      type: Object,
      required: false,
    },
    settingsSidebar: {
      type: Object,
      required: false,
    },
    settingsFooter: {
      type: Object,
      required: false,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Settings", SettingSchema);
