const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Residential', 'Commercial', 'Public', 'Other']
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  year: {
    type: String,
    required: true
  },
  area: {
    type: String,
    required: false  // Optional field
  },
  thumbnail: {
    type: String,
    required: false  // Will be auto-set to first image
  },
  description: {
    type: String,
    required: true
  },
  images: [{
    type: String,
    required: true
  }],
  details: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update updatedAt on save
ProjectSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Project', ProjectSchema);
