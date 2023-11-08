const Logs = require("../models/log.model");

exports.create = (req, res) => {
  const log = new Logs({
    userId: req.body.userId,
    date: req.body.date,
    description: req.body.description
  });

  log.save(log).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({ message: err.message || "Some error occurred while creating the Log." });
  });
};


exports.findAll = (req, res) => {
  const obj = req.query.userId ? {userId : req.query.userId}: null;
  Logs.find(obj).then(data => {
    res.send({
      data: data,
      message: 'All Logs items retrieving successfully.'
    });
  }).catch(err => {
    res.status(500).send({ message: err.message || "Some error occurred while retrieving all Logs items." });
  });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Logs.findById(id).then(data => {
    if (!data) {
      res.status(404).send({ message: `Not found Log item with id=${id}.` });
    } else res.send(data);
  }).catch(err => {
    res
      .status(500).send({ message: `Error retriving Log item with id=${id}.` });
  });
};


exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty!" });
  }

  const id = req.params.id;

  Logs.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
    if (!data) {
      res.status(404).send({ message: `Cannot update Log item with id=${id}. Maybe Log item was not found!` });
    } else res.send({ message: "Log item was updated successfully." });
  }).catch(err => {
    res.status(500).send({ message: `Error updating Log item with id=${id}.` });
  });
};


exports.delete = (req, res) => {
  const id = req.params.id;

  Logs.findByIdAndRemove(id, { useFindAndModify: false }).then(data => {
    if (!data) {
      res.status(404).send({ message: `Cannot delete Log item with id=${id}. Maybe Log item was not found!` });
    } else {
      res.send({ message: "Log item was deleted successfully!" });
    }
  }).catch(err => {
    res.status(500).send({ message: `Could not delete Log item with id=${id}.` });
  });
};

exports.deleteAll = (req, res) => {
  Logs.deleteMany({}).then(data => {
    res.send({ message: `${data.deletedCount} Logs items were deleted successfully!` });
  }).catch(err => {
    res.status(500).send({ message: err.message || "Some error occurred while removing all Logs items." });
  });
};
