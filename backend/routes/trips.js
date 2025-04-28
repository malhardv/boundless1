import express from 'express'
import Trip from '../models/Trip.js'
import { Router } from 'express'
import auth from '../middleware/auth.js'

const router = Router();

router.use(auth);

router.get('/', async(req, res) => {
    const trips = await Trip.find({ user: req.user.userId });
    res.json(trips);
})

router.post('/', async(req, res) => {
    const trip = new Trip({ ...req.body, user: req.user.userId });
    await trip.save()
    res.status(201).json(trip)
})

// update trip
router.put('/:id', async (req, res) => {
    try {
      const trip = await Trip.findOneAndUpdate(
        { _id: req.params.id, user: req.user.userId },
        req.body,
        { new: true }
      );
      if (!trip) return res.status(404).json({ message: "Trip not found" });
      res.json(trip);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Delete trip
  router.delete('/:id', async (req, res) => {
    try {
      const trip = await Trip.findOneAndDelete({ _id: req.params.id, user: req.user.userId });
      if (!trip) return res.status(404).json({ message: "Trip not found" });
      res.json({ message: "Trip deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

export default router;