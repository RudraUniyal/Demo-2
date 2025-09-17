const mongoose = require('mongoose');

const hazardSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['tsunami', 'storm', 'waves', 'flooding', 'social'],
    index: true
  },
  severity: {
    type: String,
    required: true,
    enum: ['low', 'moderate', 'high', 'critical'],
    index: true
  },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      index: '2dsphere'
    },
    address: String
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  },
  reporter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  media: [{
    url: String,
    type: {
      type: String,
      enum: ['image', 'video']
    }
  }],
  status: {
    type: String,
    enum: ['active', 'resolved', 'archived'],
    default: 'active'
  }
}, {
  timestamps: true
});

// Index for geospatial queries
hazardSchema.index({ location: '2dsphere' });

// Index for text search
hazardSchema.index({ description: 'text' });

module.exports = mongoose.model('Hazard', hazardSchema);