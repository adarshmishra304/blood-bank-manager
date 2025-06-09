import Donor from '../models/Donor.js';
import bcrypt from 'bcrypt';
import e from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Register donor
export const registerDonor = async (req, res) => {
  try {
    const { name, email, password, bloodType } = req.body;

    const existingDonor = await Donor.findOne({ email });
    if (existingDonor) {
      return res.status(400).json({ message: 'Donor already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const donor = new Donor({
      name,
      email,
      password: hashedPassword,
      bloodType,
    });

    await donor.save();
    res.status(201).json({ message: 'Donor registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Login donor
export const loginDonor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const donor = await Donor.findOne({ email });
    if (!donor) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, donor.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: donor._id, email: donor.email }, JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(200).json({ token, donor: { id: donor._id, name: donor.name, role: donor.role, email: donor.email, bloodType: donor.bloodType } });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// for profile
export const getDonorProfile = async (req, res) => {
  try {
    const donor = await Donor.findById(req.user.id).select('-password');
    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }
    res.json(donor);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

