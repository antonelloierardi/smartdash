const bcrypt = require('bcrypt');
const Joi = require('joi');
const Users = require('../models/user.model');

const userSchema = Joi.object({
  companyID: Joi.string(),
  company: Joi.string(),
  photo: Joi.string(),
  name: Joi.string(),
  surname: Joi.string(),
  position: Joi.string(),
  role: Joi.string(),
  status: Joi.string(),
  site: Joi.string(),
  address: Joi.string(),
  cap: Joi.string(),
  city: Joi.string(),
  province: Joi.string(),
  email: Joi.string().email(),
  tel: Joi.string(),
  mobile: Joi.string(),
  password: Joi.string().required(),
  repeatPassword: Joi.string().required().valid(Joi.ref('password'))
});

const userSchemaId = Joi.object({
  _id: Joi.string().required(),
  companyID: Joi.string(),
  company: Joi.string(),
  photo: Joi.string(),
  name: Joi.string(),
  surname: Joi.string(),
  position: Joi.string(),
  role: Joi.string(),
  status: Joi.string(),
  site: Joi.string(),
  address: Joi.string(),
  cap: Joi.string(),
  city: Joi.string(),
  province: Joi.string(),
  email: Joi.string().email(),
  tel: Joi.string(),
  mobile: Joi.string(),
  password: Joi.string().required(),
  repeatPassword: Joi.string().required().valid(Joi.ref('password'))
});

module.exports = {
  insert,
  update,
  deleteUser,
  findAll,
  findOne,
  updateUser
};

async function insert(user) {
  user = await userSchema.validateAsync(user, { abortEarly: false });
  user.hashedPassword = bcrypt.hashSync(user.password, 10);
  delete user.password;
  return await new Users(user).save();
}

async function update(user) {
  user = await userSchemaId.validateAsync(user, { abortEarly: false });
  user.hashedPassword = bcrypt.hashSync(user.password, 10);
  delete user.password;
  return await new Users(user).updateOne(user);
}
function updateUser (req, res) {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty!" });
  }
  const id = req.params.id;
  let photo;
  if (req.file) {
    photo = '/assets/images/profiles/' + req.file.filename
  } else photo = req.body.photo;
  req.body.photo = photo;
  
  Users.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
    if (!data) {
      res.status(404).send({ message: `Cannot update User with id=${id}. Maybe User was not found!` });
    } else res.send({ message: "User was updated successfully." });
  }).catch(err => {
    res.status(500).send({ message: "Error updating User with id=" + id });
  });
};

function deleteUser(req, res) {
  const id = req.params.id;
   Users.findByIdAndDelete(id).then(data => {
    if (!data) {
      res.status(404).send({ message: `Cannot delete User with id=${id}. Maybe User was not found.` });
    } else {
      res.send({
        message: "L'utente è stato eliminato correttamente.",
        user: data
     });
    }
  }).catch(err => {
    res.status(500).send({ message: `Could not delete User with id=${id}.` });
  })
}

function findAll(req, res)  {
  const obj = req.query.companyID ? {companyID : req.query.companyID}: null;
  Users.find(obj).then(data => {
    res.send({
      message: "All Users items retrieving successfully.",
      data: data
    });
  }).catch(err => {
    res.status(500).send({ message: err.message || "Some error occurred while retrieving all Users items." });
  });
};

function findOne(req, res)  {
  const id = req.params.id;
  Users.findById(id).then(data => {
    if (!data) {
      res.status(404).send({ message: `Not found User item with id=${id}.` });
    } else res.send(data);
  }).catch(err => {
    res.status(500).send({ message: `Error retriving User item with id=${id}.` });
  });
};
