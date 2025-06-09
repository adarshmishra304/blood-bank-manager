// models/BloodTransaction.js
import mongoose from 'mongoose';

const bloodTransactionSchema = new mongoose.Schema({
  bloodGroup: {
    type: String,
    required: true,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  type: {
    type: String,
    enum: ['donation', 'request'],
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  hospitalName: {
    type: String,
    required: true,
  },
  donorName: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Donor', // or 'User' if you generalize
  },
  date: { 
    type: Date,
    default: Date.now,
  },
});


const BloodTransaction = mongoose.model('BloodTransaction', bloodTransactionSchema);
export { BloodTransaction };