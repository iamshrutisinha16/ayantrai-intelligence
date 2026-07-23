const express = require('express');
const router = express.Router();
const Violation = require('../models/Violation');
const Worker = require('../models/Worker');
const { verifySupervisor } = require('../middleware/authMiddleware');

// Get all violations for supervisors
router.get('/violations', verifySupervisor, async (req, res) => {
  try {
    const violations = await Violation.find().populate('worker').sort({ createdAt: -1 });
    res.status(200).json(violations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Acknowledge a violation
router.put('/acknowledge/:id', verifySupervisor, async (req, res) => {
  try {
    const violation = await Violation.findById(req.params.id);
    if (!violation) return res.status(404).json({ message: 'Violation not found' });

    violation.status = 'Acknowledged';
    violation.acknowledgedAt = new Date();
    violation.supervisor = req.user.id;
    await violation.save();

    res.status(200).json({ message: 'Violation acknowledged successfully', violation });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Simulate an IoT Violation (For testing/demo purpose)
router.post('/simulate-violation', verifySupervisor, async (req, res) => {
  try {
    const workers = await Worker.find();
    if (workers.length === 0) return res.status(404).json({ message: 'No workers found to simulate' });

    const randomWorker = workers[Math.floor(Math.random() * workers.length)];
    const newViolation = new Violation({
      worker: randomWorker._id,
      violationType: 'PPE Non-Compliance (Helmet Missing)',
      status: 'Pending'
    });

    await newViolation.save();
    res.status(201).json({ message: 'IoT violation simulated successfully', newViolation });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;