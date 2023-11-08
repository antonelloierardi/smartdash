const mongoose = require("mongoose");

const SidebarSchema = new mongoose.Schema(
  {
    companyID: {
      type: String,
      required: false,
    },
    sidebar: {
      type: Array,
      required: false,
    },
  },
  {
    versionKey: false,
  }
);
module.exports = mongoose.model("Sidebar", SidebarSchema);
