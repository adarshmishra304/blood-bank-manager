// controllers/bloodController.js
import { BloodInventory } from '../models/BloodInventory.js';
import { BloodTransaction } from '../models/BloodTransaction.js';

export const getInventory = async (req, res) => {
  try {
    const inventory = await BloodInventory.find({});
    res.json(inventory);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const addBlood = async (req, res) => {
  const { bloodGroup, quantity } = req.body;
  if (!bloodGroup || !quantity) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existing = await BloodInventory.findOne({ bloodGroup });
    if (existing) {
      existing.quantity += quantity;
      existing.updatedAt = new Date();
      await existing.save();
    } else {
      await BloodInventory.create({ bloodGroup, quantity });
    }
    res.json({ message: 'Inventory updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating inventory', error: err.message });
  }


  await BloodTransaction.create({
    bloodGroup,
    quantity,
    type: 'donation',
    user: req.user.id, // assuming verifyToken adds `req.user`
  });
};

export const requestBlood = async (req, res) => {
  const { bloodGroup, quantity } = req.body;
  if (!bloodGroup || !quantity) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const stock = await BloodInventory.findOne({ bloodGroup });
    if (!stock || stock.quantity < quantity) {
      return res.status(400).json({ message: 'Insufficient blood stock' });
    }

    stock.quantity -= quantity;
    stock.updatedAt = new Date();
    await stock.save();

    res.json({ message: 'Blood request processed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }


  await BloodTransaction.create({
    bloodGroup,
    quantity,
    type: 'request',
    user: req.user.id,
  });
};



export const getBloodStats = async (req, res) => {
  try {
    const donations = await BloodTransaction.aggregate([
      { $match: { type: 'donation' } },
      { $group: { _id: '$bloodGroup', total: { $sum: '$quantity' } } },
    ]);

    const requests = await BloodTransaction.aggregate([
      { $match: { type: 'request' } },
      { $group: { _id: '$bloodGroup', total: { $sum: '$quantity' } } },
    ]);

    res.json({ donations, requests });
  } catch (err) {
    console.error('❌ Failed to get blood stats:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
