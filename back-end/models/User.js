//IMPORT
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//SCHEMA
const userShema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

//PLUGIN
userShema.plugin(uniqueValidator);

//EXPORT
module.exports = mongoose.model('User', userShema);