// models/BloodInventory.js
import mongoose from 'mongoose';

const bloodInventorySchema = new mongoose.Schema({
  bloodGroup: {
    type: String,
    required: true,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const BloodInventory = mongoose.model('BloodInventory', bloodInventorySchema);
