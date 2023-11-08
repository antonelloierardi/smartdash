const Agenda = require("../models/agenda.model");

exports.create = (req, res) => {
  const agenda = new Agenda({
    userId: req.body.userId,
    date: req.body.date,
    description: req.body.description,
    completed: req.body.completed
  });

  agenda.save(agenda).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Agenda."
    });
  });
};


exports.findAll = (req, res) => {
  const userId = req.query.userId;
  Agenda.find({ userId: userId }).then(data => {
    res.send({
      data: data,
      message: 'All Agenda items retrieving successfully.'
    });
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving all Agenda items."
    });
  });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Agenda.findById(id).then(data => {
    if (!data) {
      res.status(404).send({ message: `Not found Agenda item with id=${id}.` });
    } else res.send(data);
  }).catch(err => {
    res.status(500).send({ message: `Error retriving Agenda item with id=${id}.` });
  });
};


exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty!" });
  }

  const id = req.params.id;

  Agenda.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
    if (!data) {
      res.status(404).send({ message: `Cannot update Agenda item with id=${id}. Maybe Agenda item was not found!` });
    } else res.send({ message: "Agenda item was updated successfully." });
  }).catch(err => {
    res.status(500).send({ message: `Error updating Agenda item with id=${id}.` });
  });
};


exports.delete = (req, res) => {
  const id = req.params.id;

  Agenda.findByIdAndRemove(id, { useFindAndModify: false }).then(data => {
    if (!data) {
      res.status(404).send({ message: `Cannot delete Agenda item with id=${id}. Maybe Agenda item was not found!` });
    } else {
      res.send({ message: "Agenda item was deleted successfully!" });
    }
  }).catch(err => {
    res.status(500).send({ message: `Could not delete Agenda item with id=${id}.` });
  });
};

exports.deleteAll = (req, res) => {
  const userId = req.query.userId
  Agenda.deleteMany({ userId: userId }).then(data => {
    res.send({ message: `${data.deletedCount} Agenda items were deleted successfully!` });
  }).catch(err => {
    res.status(500).send({ message: err.message || "Some error occurred while removing all Agenda items." });
  });
};
