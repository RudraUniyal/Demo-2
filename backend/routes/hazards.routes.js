const express = require('express');
const router = express.Router();
const {
  getHazards,
  getHazardById,
  createHazard,
  updateHazard,
  deleteHazard,
  getHazardsNearby
} = require('../controllers/hazards.controller');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/', getHazards);
router.get('/nearby', getHazardsNearby);
router.get('/:id', getHazardById);

// Private routes
router.post('/', protect, createHazard);
router.put('/:id', protect, updateHazard);
router.delete('/:id', protect, deleteHazard);

module.exports = router;