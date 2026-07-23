const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Worker = require('../models/Worker');
const Violation = require('../models/Violation');
const bcrypt = require('bcryptjs');
const { verifyAdmin } = require('../middleware/authMiddleware');

// Create a new Supervisor
router.post('/create-supervisor', verifyAdmin, async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newSupervisor = new User({
      name,
      email,
      password: hashedPassword,
      role: 'supervisor'
    });

    await newSupervisor.save();
    res.status(201).json({ message: 'Supervisor created successfully', supervisor: { name, email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/alerts', verifyAdmin, async (req, res) => {
  try {
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    
    const alerts = await Violation.find({
      status: 'Pending',
      createdAt: { $lte: tenMinutesAgo }
    }).populate('worker').sort({ createdAt: 1 });

    res.status(200).json(alerts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/insights', verifyAdmin, async (req, res) => {
  try {
    const totalWorkers = await Worker.countDocuments();
    const totalViolations = await Violation.countDocuments();
    const pendingViolations = await Violation.countDocuments({ status: 'Pending' });
    const acknowledgedViolations = await Violation.countDocuments({ status: 'Acknowledged' });

    res.status(200).json({
      totalWorkers,
      totalViolations,
      pendingViolations,
      acknowledgedViolations
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;