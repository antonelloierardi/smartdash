const Companies = require("../models/company.model");

exports.create = (req, res) => {
  const company = new Companies({
    aziendaId: req.body.id,
    dataCreazione: req.body.dataCreazione,
    ragioneSociale: req.body.ragioneSociale,
    sedeLegale: req.body.sedeLegale,
    sediOperative:  req.body.sediOperative,
    partitaIva: req.body.partitaIva,
    codiceFiscale: req.body.codiceFiscale,
    webSite: req.body.webSite,
    rea: req.body.rea,
    pec: req.body.pec,
    sidebar: req.body.sidebar,
    settings: req.body.settings,
  });

  company.save(company).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({ message: err.message || "Some error occurred while creating the Company." });
  });
};


exports.findAll = (req, res) => {
  Companies.find().then(data => {
    res.send({
      message: "All Companies items retrieving successfully.",
      data: data
    });
  }).catch(err => {
    res.status(500).send({ message: err.message || "Some error occurred while retrieving all Companies items." });
  });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Companies.findById(id).then(data => {
    if (!data) {
      res.status(404).send({ message: "Not found Company with id " + id });
    } else res.send(data);
  }).catch(err => {
    res.status(500).send({ message: "Error retrieving Company with id=" + id });
  });
};


exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty!" });
  }
  const id = req.params.id;
  let photo;
  if (req.file) {
    photo = '/assets/images/profiles/' + req.file.filename
  } else photo = req.body.photo;
  req.body.photo = photo;
  Companies.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
    if (!data) {
      res.status(404).send({ message: `Cannot update Company with id=${id}. Maybe Company was not found!` });
    } else res.send({ 
      message: "Company was updated successfully.",
      data: data
     });
  }).catch(err => {
    res.status(500).send({ message: "Error updating Company with id=" + id });
  });
};


exports.delete = (req, res) => {
  const id = req.params.id;
  Companies.findByIdAndRemove(id, { useFindAndModify: false }).then(data => {
    if (!data) {
      res.status(404).send({ message: `Cannot delete Company with id=${id}. Maybe Company was not found!` });
    } else {
      res.send({ message: "Company was deleted successfully!" });
    }
  }).catch(err => {
    res.status(500).send({ message: "Could not delete Company with id=" + id });
  });
};

exports.deleteAll = (req, res) => {
  Companies.deleteMany({}).then(data => {
    res.send({ message: `${data.deletedCount} Companies were deleted successfully!` });
  }).catch(err => {
    res.status(500).send({ message: err.message || "Some error occurred while removing all Companies." });
  });
};
