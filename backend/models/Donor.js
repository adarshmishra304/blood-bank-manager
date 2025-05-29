import mongoose from 'mongoose';

const donorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  bloodType: { type: String, required: true },
  lastDonated: { type: Date },
}, { timestamps: true });

const Donor = mongoose.model('Donor', donorSchema);
export default Donor;
