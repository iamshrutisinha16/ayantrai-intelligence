const mongoose = require('mongoose');

const violationSchema = new mongoose.Schema({

  worker: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Worker',
    required: true 
  },

  violationType: {  
    type: String,
    default: 'PPE Non-Compliance (No Helmet / Safety Jacket)' 
  },

  status: {
     type: String,
     enum: ['Pending', 'Acknowledged'], default: 'Pending'
  },

  acknowledgedAt: { 
    type: Date,
    default: null 
  },

  supervisor: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
 }
 
}, { timestamps: true });

module.exports = mongoose.model('Violation', violationSchema);