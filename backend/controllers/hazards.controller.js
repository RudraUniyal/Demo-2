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