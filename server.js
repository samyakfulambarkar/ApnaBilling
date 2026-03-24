const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// 🔗 MongoDB connect
mongoose.connect("mongodb+srv://admin:1234@apnabilling.aurhbiy.mongodb.net/ApnaBilling")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// 📦 Schema
const BillSchema = new mongoose.Schema({
  items: Array,
  subtotal: Number,
  gst: Number,
  total: Number,
  payment: String,
  date: Date
});

const Bill = mongoose.model("Bill", BillSchema);

// ✅ Save Bill
app.post('/api/bill', async (req, res) => {
  try {
    const bill = await Bill.create(req.body);
    res.json(bill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get Bills
app.get('/api/bills', async (req, res) => {
  const bills = await Bill.find().sort({ date: -1 });
  res.json(bills);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});