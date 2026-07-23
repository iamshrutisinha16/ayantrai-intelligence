const mongoose = require('mongoose');
const XLSX = require('xlsx');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const Worker = require('./models/Worker');
const User = require('./models/User');

// FIXED: Removed unsupported options
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected for Seeding...'))
  .catch(err => { console.log(err); process.exit(1); });

const seedDatabase = async () => {
  try {
    // 1. Clear old data
    await Worker.deleteMany();
    await User.deleteMany();

    // 2. Create Default Admin
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await User.create({
      name: 'System Admin',
      email: 'admin@ayantrai.com',
      password: hashedPassword,
      role: 'admin'
    });

    // 3. Create Default Supervisor for testing
    const supervisorPassword = await bcrypt.hash('supervisor123', 10);
    await User.create({
      name: 'Site Supervisor',
      email: 'supervisor@ayantrai.com',
      password: supervisorPassword,
      role: 'supervisor'
    });

    // 4. Read Excel File & Seed Workers
    const workbook = XLSX.readFile('./data/workers_dataset.xlsx');
    const sheetName = workbook.SheetNames[0];
    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    const formattedWorkers = sheetData.map(row => ({
      workerId: row['Worker ID'],
      name: row['Name'],
      jobProfile: row['Job Profile'],
      department: row['Department'],
      mobileNumber: String(row['Mobile Number']),
      aadharNumber: String(row['Aadhar Number'])
    }));

    await Worker.insertMany(formattedWorkers);
    console.log(`Successfully seeded ${formattedWorkers.length} workers and default users!`);
    process.exit();
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedDatabase();