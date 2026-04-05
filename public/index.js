require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Entry = require('./models/Entry');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// POST Submission
app.post('/api/submit', async (req, res) => {
  try {
    const newEntry = new Entry(req.body);
    await newEntry.save();
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to save entry" });
  }
});

// GET All Entries (Admin)
app.get('/api/entries', async (req, res) => {
  const { password } = req.query;
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const entries = await Entry.find().sort({ timestamp: -1 });
  res.json(entries);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
