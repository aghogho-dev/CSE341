const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  
  const result = await mongodb.getDb().db("W01_Project").collection('Contacts').find();
  // result.toArray().then((lists) => {
  //   res.setHeader('Content-Type', 'application/json');
  //   res.status(200).json(lists);
  // });

  result.toArray((err, lists) => {

    if (err) {
      res.status(400).json({ message: err });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);

  });
};

const getSingle = async (req, res) => {

  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid id to find a contact.");
  }

  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db("W01_Project").collection('Contacts').find({ _id: userId });
  
  // result.toArray().then((lists) => {
  //   res.setHeader('Content-Type', 'application/json');
  //   res.status(200).json(lists[0]);
  // });

  result.toArray((err, result) => {

    if (err) {
      res.status(400).json({ message: err });
    }

    if (result.length === 0) {
      res.status(404).json({ message: "No contact with this id" });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result[0]);

  });
};

const createContact = async (req, res) => {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb.getDb().db("W01_Project").collection('Contacts').insertOne(contact);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the contact.');
  }
};

const updateContact = async (req, res) => {

  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must be a valid id to update a contact.");
  }

  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };

  const response = await mongodb
    .getDb()
    .db("W01_Project")
    .collection('Contacts')
    .replaceOne({ _id: userId }, contact);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the contact.');
  }
};

const deleteContact = async (req, res) => {

  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must be a valid id to delete a contact.");
  }

  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db("W01_Project").collection('Contacts').remove({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};
