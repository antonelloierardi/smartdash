const Sidebars = require("../models/sidebar.model");

exports.create = (req, res) => {
  const sidebar = new Sidebars({
    icona: req.body.icona,
    link: req.body.link,
    testoLink: req.body.testoLink,
    subLink: req.body.subLink,
    isCollapsed: req.body.isCollapsed,
  });

  sidebar.save(sidebar).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({ message: err.message || "Some error occurred while creating the Sidebar." });
  });
};


exports.findAll = (req, res) => {
  const obj = req.query.companyID ? {companyID : req.query.companyID}: null;
  Sidebars.find({companyID : req.query.companyID}).then(data => {
    res.send({
      message: "All Sidebars items retrieving successfully.",
      data: data
    });
  }).catch(err => {
    res.status(500).send({ message: err.message || "Some error occurred while retrieving all Sidebars items." });
  });
};

exports.findOne = (req, res) => {
  const id = req.params.companyID;
  Sidebars.findById(id).then(data => {
    if (!data) {
      res.status(404).send({ message: "Not found Sidebar with id " + id });
    } else res.send(data);
  }).catch(err => {
    res.status(500).send({ message: "Error retrieving Sidebar with id=" + id });
  });
};


exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty!" });
  }
  const id = req.params.id;
  Sidebars.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
    if (!data) {
      res.status(404).send({ message: `Cannot update Sidebar with id=${id}. Maybe Sidebar was not found!` });
    } else res.send({ message: "Sidebar was updated successfully." });
  }).catch(err => {
    res.status(500).send({ message: "Error updating Sidebar with id=" + id });
  });
};


exports.delete = (req, res) => {
  const id = req.params.id;
  Sidebars.findByIdAndRemove(id, { useFindAndModify: false }).then(data => {
    if (!data) {
      res.status(404).send({ message: `Cannot delete Sidebar with id=${id}. Maybe Sidebar was not found!` });
    } else {
      res.send({ message: "Sidebar was deleted successfully!" });
    }
  }).catch(err => {
    res.status(500).send({ message: "Could not delete Sidebar with id=" + id });
  });
};

exports.deleteAll = (req, res) => {
  Sidebars.deleteMany({}).then(data => {
    res.send({ message: `${data.deletedCount} Sidebars were deleted successfully!` });
  }).catch(err => {
    res.status(500).send({ message: err.message || "Some error occurred while removing all Sidebars." });
  });
};
