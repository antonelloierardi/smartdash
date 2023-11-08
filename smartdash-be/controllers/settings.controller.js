const Settings = require("../models/setting.model");

exports.create = (req, res) => {
  const setting = new Settings({
  companyID: req.body.companyID,
  userID: req.body.userID,
  settingsHeader: req.body.settingsHeader,
  settingsSidebar: req.body.settingsSidebar,
  settingsFooter: req.body.settingsFooter
  });

  setting.save(setting).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({ message: err.message || "Some error occurred while creating the Settings." });
  });
};


exports.findAll = (req, res) => {
  const userID = req.query.userID

  Settings.find({userID : req.query.userID}).then(data => {
    res.send({
      message: "All Settings items retrieving successfully",
      data: data
    });
  }).catch(err => {
    res.status(500).send({ message: err.message || "Some error occurred while retrieving Settings." });
  });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Settings.findById(id).then(data => {
    if (!data) {
      res.status(404).send({ message: "Not found Settings with id " + id });
    } else res.send(data);
  }).catch(err => {
    res.status(500).send({ message: "Error retrieving Settings with id=" + id });
  });
};


exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty!" });
  }

  const id = req.params.id;

  Settings.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false }).then(data => {
    if (!data) {
      res.status(404).send({ message: `Cannot update Settings with id=${id}. Maybe Settings was not found!` });
    } else res.send({ message: "Settings was updated successfully." });
  }).catch(err => {
    res.status(500).send({ message: "Error updating Settings with id=" + id });
  });
};


exports.delete = (req, res) => {
  const id = req.params.id;

  Settings.findByIdAndRemove(id, { useFindAndModify: false }).then(data => {
    if (!data) {
      res.status(404).send({ message: `Cannot delete Settings with id=${id}. Maybe Settings was not found!` });
    } else res.send({ message: "Settings was deleted successfully!" });
  }).catch(err => {
    res.status(500).send({ message: "Could not delete Settings with id=" + id });
  });
};

exports.deleteAll = (req, res) => {
  Settings.deleteMany({}).then(data => {
    res.send({ message: `${data.deletedCount} Settings were deleted successfully!` });
  }).catch(err => {
    res.status(500).send({ message: err.message || "Some error occurred while removing all Settings." });
  });
};
