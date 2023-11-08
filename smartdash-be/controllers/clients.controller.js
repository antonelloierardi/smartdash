const Clients = require("../models/client.model");

/* exports.create = (req, res) => {
  const client = new Clients({
  photo: req.file ? '/assets/images/profiles/' + req.file.filename :'/assets/images/profiles/no-image.png',
  name: req.body.name,
  surname: req.body.surname,
  address: req.body.address,
  cap: req.body.cap,
  city: req.body.city,
  provincie: req.body.provincie,
  tel: req.body.tel,
  email: req.body.email,
  mobile: req.body.mobile,
  nameCompany: req.body.nameCompany,
  type: req.body.type,
  legalSite: req.body.legalSite,
  operatingOffices: req.body.operatingOffices,
  vatNumber: req.body.vatNumber,
  taxCode: req.body.taxCode,
  webSite: req.body.webSite,
  rea: req.body.rea,
  pec: req.body.pec,
  });

  client.save(client)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Client."
      });
    });
}; */


 exports.create = (req, res) => {
  const client = new Clients({
  photo: req.file ? '/assets/images/profiles/' + req.file.filename :'/assets/images/profiles/no-image.png',
  data: req.body.data
  });

  client.save(client)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Client."
      });
    });
}; 


exports.findAll = (req, res) => {
  Clients.find()
    .then(data => {
      res.send({
        message: "All Clients items retrieving successfully",
        data: data
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Clients."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Clients.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Client with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Client with id=" + id });
    });
};


exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;
  
  let photo;
  if (req.file) {
    photo = '/assets/images/profiles/' + req.file.filename
  } else photo = '/assets/images/profiles/no-image.png';
  req.body.photo = photo;

  Clients.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Client with id=${id}. Maybe Clienti was not found!`
        });
      } else res.send({
        message: "Aggiornamento avvenuto con successo!",
        data: data
      });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Client with id=" + id
      });
    });
};

// Delete a Client with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Clients.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Client with id=${id}. Maybe Client was not found!`
        });
      } else {
        res.send({
          message: "Eliminazione avvenuta con successo!",
          data: data
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Could not delete Client with id=${id}`
      });
    });
};

exports.deleteAll = (req, res) => {
  Clients.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Clients were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Clients."
      });
    });
};
