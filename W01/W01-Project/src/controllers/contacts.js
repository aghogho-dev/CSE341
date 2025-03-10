const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;


const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db("W01_Project").collection("Contacts").find();
    result.toArray()
        .then((contacts) => {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(contacts);
        });
};

const getOne = async (req, res) => {
    const userId = ObjectId.createFromHexString(req.params.id);
    const result = await mongodb.getDatabase().db("W01_Project").collection("Contacts").find({ _id: userId });
    result.toArray()
        .then((contacts) => {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(contacts[0]);
        });
};

module.exports = {
    getAll,
    getOne,
}