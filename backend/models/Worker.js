const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({

  workerId: {
     type: String, 
     required: true, 
     unique: true 
    },

  name: {
     type: String,
     required: true
    },

  jobProfile: { 
     type: String, 
     required: true
    },

  department: { 
    type: String,
    required: true
    },

  mobileNumber: {
     type: String, 
     required: true 
    },

  aadharNumber: { 
    type: String,
    required: true }
});

module.exports = mongoose.model('Worker', workerSchema);