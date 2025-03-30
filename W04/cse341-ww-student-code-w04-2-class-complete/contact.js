const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    id: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true },
    favoriteColor: { type: String },
    birthday: {type: String},
 });
 
 module.exports = mongoose.model('Contact', contactSchema, "Contacts");