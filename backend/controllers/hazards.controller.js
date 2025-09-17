const Hazard = require('../models/Hazard');
const User = require('../models/User');
const Joi = require('joi');

// Validation schema for hazard creation
const hazardSchema = Joi.object({
  type: Joi.string().valid('tsunami', 'storm', 'waves', 'flooding', 'social').required(),
  severity: Joi.string().valid('low', 'moderate', 'high', 'critical').required(),
  location: Joi.object({
    coordinates: Joi.array().items(Joi.number()).length(2).required(),
    address: Joi.string().optional()
  }).required(),
  description: Joi.string().max(500).required(),
  media: Joi.array().items(Joi.object({
    url: Joi.string().uri().required(),
    type: Joi.string().valid('image', 'video').required()
  })).optional()
});

// Mock data for hazards
const mockHazards = [
  {
    _id: '1',
    type: 'tsunami',
    severity: 'high',
    location: {
      coordinates: [12.9716, 77.5946],
      address: 'Bangalore, India'
    },
    description: 'Tsunami warning for coastal areas',
    createdAt: new Date()
  },
  {
    _id: '2',
    type: 'storm',
    severity: 'moderate',
    location: {
      coordinates: [13.0827, 80.2707],
      address: 'Chennai, India'
    },
    description: 'Severe storm approaching',
    createdAt: new Date()
  }
];

// Mock controller functions
const getHazards = async (req, res) => {
  try {
    res.json(mockHazards);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const getHazardById = async (req, res) => {
  try {
    const hazard = mockHazards.find(h => h._id === req.params.id);
    if (hazard) {
      res.json(hazard);
    } else {
      res.status(404).json({ error: 'Hazard not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const createHazard = async (req, res) => {
  try {
    // Validate request body
    const { error } = hazardSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const newHazard = {
      _id: Math.random().toString(36).substr(2, 9),
      ...req.body,
      createdAt: new Date()
    };

    mockHazards.push(newHazard);
    res.status(201).json(newHazard);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const updateHazard = async (req, res) => {
  try {
    const hazardIndex = mockHazards.findIndex(h => h._id === req.params.id);
    if (hazardIndex === -1) {
      return res.status(404).json({ error: 'Hazard not found' });
    }

    // Validate request body
    const { error } = hazardSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    mockHazards[hazardIndex] = {
      ...mockHazards[hazardIndex],
      ...req.body,
      updatedAt: new Date()
    };

    res.json(mockHazards[hazardIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const deleteHazard = async (req, res) => {
  try {
    const hazardIndex = mockHazards.findIndex(h => h._id === req.params.id);
    if (hazardIndex === -1) {
      return res.status(404).json({ error: 'Hazard not found' });
    }

    mockHazards.splice(hazardIndex, 1);
    res.json({ message: 'Hazard removed' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const getHazardsNearby = async (req, res) => {
  try {
    // For demo purposes, return all hazards
    res.json(mockHazards);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getHazards,
  getHazardById,
  createHazard,
  updateHazard,
  deleteHazard,
  getHazardsNearby
};