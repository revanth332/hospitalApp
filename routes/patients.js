const express = require('express');
const router = express.Router();
const Patient = require('../models/patient');

// Route to add a new patient
router.post('/add', async (req, res) => {
  try {
    const {
      name,
      phoneNumber,
      altPhoneNumber,
      city,
      state,
      dob,
      age,
      gender,
      maritalStatus,
      employment,
      employmentStatus,
    } = req.body;

    const newPatient = new Patient({
      name,
      phoneNumber,
      altPhoneNumber,
      city,
      state,
      dob,
      age,
      gender,
      maritalStatus,
      employment,
      employmentStatus,
    });

    await newPatient.save();
    res.status(200).json({ message: 'Patient added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to get all patients data
router.get('/all', async (req, res) => {
    try {
      const patients = await Patient.find();
      res.status(200).json(patients);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  router.post('/update',async (req,res) => {
    try {
      const temp = {};
      Object.assign(temp, req.body);
      const id = temp._id;
      delete temp._id;
      const patient = await Patient.updateOne({_id:id},{$set : temp});
      res.status(200).json(patient);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  })

  router.post('/delete',async (req,res) => {
    try {
      const patient = await Patient.deleteOne({_id:req.body.patientId});
      res.status(200).json(patient);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  })

module.exports = router;
