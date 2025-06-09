// controllers/bloodController.js
import { BloodInventory } from '../models/BloodInventory.js';
import { BloodTransaction } from '../models/BloodTransaction.js';

export const getInventory = async (req, res) => {
  try {
    const inventory = await BloodInventory.find({}, 'bloodGroup quantity latitude longitude hospitalName updatedAt');
    res.json(inventory);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};



export const addBlood = async (req, res) => {
  const { bloodGroup, quantity, latitude, longitude, hospitalName, donorName } = req.body;

  if (!bloodGroup || !quantity || latitude == null || longitude == null || !hospitalName || !donorName) {
    return res.status(400).json({
      message: 'All fields (bloodGroup, quantity, latitude, longitude, hospitalName, donorName) are required'
    });
  }

  try {
    const existing = await BloodInventory.findOne({ bloodGroup });

    if (existing) {
      existing.quantity += quantity;
      existing.updatedAt = new Date();
      existing.latitude = latitude;
      existing.longitude = longitude;
      existing.hospitalName = hospitalName;
      await existing.save();
    } else {
      await BloodInventory.create({
        bloodGroup,
        quantity,
        latitude,
        longitude,
        hospitalName
      });
    }

    await BloodTransaction.create({
      bloodGroup,
      quantity,
      type: 'donation',
      latitude,
      longitude,
      hospitalName,
      donorName,
      user: req.user?.id || null,
    });

    res.json({ message: 'Inventory updated successfully' });
  } catch (err) {
    res.status(500).json({
      message: 'Error updating inventory',
      error: err.message
    });
  }
};

export const requestBlood = async (req, res) => {
  const { bloodGroup, quantity, latitude, longitude, hospitalName, donorName } = req.body;

  if (!bloodGroup || !quantity || latitude == null || longitude == null || !hospitalName || !donorName) {
    return res.status(400).json({
      message: 'All fields (bloodGroup, quantity, latitude, longitude, hospitalName, donorName) are required'
    });
  }

  try {
    const stock = await BloodInventory.findOne({ bloodGroup });
    if (!stock || stock.quantity < quantity) {
      return res.status(400).json({ message: 'Insufficient blood stock' });
    }

    stock.quantity -= quantity;
    stock.updatedAt = new Date();
    await stock.save();

    await BloodTransaction.create({
      bloodGroup,
      quantity,
      type: 'request',
      latitude,
      longitude,
      hospitalName,
      donorName,
      user: req.user?.id || null,
    });

    res.json({ message: 'Blood request processed successfully' });
  } catch (err) {
    res.status(500).json({
      message: 'Server error',
      error: err.message
    });
  }
};


export const getBloodStats = async (req, res) => {
  try {
    const donations = await BloodTransaction.aggregate([
      { $match: { type: 'donation' } },
      {
        $group: {
          _id: '$bloodGroup',
          total: { $sum: '$quantity' },
          // latitude: { $avg: '$latitude' },
          // longitude: { $avg: '$longitude' },
          // hospitals: { $addToSet: '$hospitalName' },
        },
      },
    ]);

    const requests = await BloodTransaction.aggregate([
      { $match: { type: 'request' } },
      {
        $group: {
          _id: '$bloodGroup',
          total: { $sum: '$quantity' },
          // Latitude: { $avg: '$latitude' },
          // Longitude: { $avg: '$longitude' },
          // hospitals: { $addToSet: '$hospitalName' },
        },
      },
    ]);

    res.json({ donations, requests });
  } catch (err) {
    console.error('❌ Failed to get blood stats:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// by transactionId
export const getDonatedBloodByTransactionId = async (req, res) => {
  const { transactionId } = req.query;

  if (!transactionId) {
    return res.status(400).json({ message: 'Transaction ID is required in query' });
  }

  try {
    const donation = await BloodTransaction.findById(transactionId);

    if (!donation || donation.type !== 'donation') {
      return res.status(404).json({ message: 'No donation record found for this transaction ID' });
    }

    res.json(donation);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
// transaction history
export const getTransactionHistory = async (req, res) => {
  try {
    const transactions = await BloodTransaction.find()
      .select('_id bloodGroup quantity type user latitude longitude hospitalName donorName createdAt __v')
      .sort({ createdAt: -1 });

    if (transactions.length === 0) {
      return res.status(404).json({ message: 'No transaction records found' });
    }

    res.json(transactions);
  } catch (err) {
    console.error('❌ Failed to get transaction history:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}
