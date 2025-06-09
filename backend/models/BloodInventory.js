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
}, {
  timestamps: true // adds createdAt and updatedAt automatically
});

export const BloodInventory = mongoose.model('BloodInventory', bloodInventorySchema);
