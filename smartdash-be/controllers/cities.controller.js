const Cities = require("../models/city.model");

exports.create = (req, res) => {
  const city = new Cities({
    comune: req.body.comune,
    provincia: req.body.provincia,
    sigla: req.body.sigla,
    regione: req.body.regione
  });

  city.save(city).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({ message: err.message || "Some error occurred while creating the City." });
  });
};


exports.findAll = (req, res) => {
  const city = req.query.comune ? { comune: req.query.comune } : {};
  Cities.find(city).then(data => {
    res.send({
      message: "All Cities items retrieving successfully.",
      data: data
    });
  }).catch(err => {
    res.status(500).send({ message: err.message || "Some error occurred while retrieving all Cities items." });
  });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Cities.findById(id).then(data => {
    if (!data) {
      res.status(404).send({ message: "Not found City with id " + id });
    } else res.send(data);
  }).catch(err => {
    res.status(500).send({ message: "Error retrieving City with id=" + id });
  });
};