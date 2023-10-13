const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  altPhoneNumber: String,
  city: String,
  state: String,
  dob: String,
  age: Number,
  gender: String,
  maritalStatus: String,
  employment: String,
  employmentStatus: String,
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
