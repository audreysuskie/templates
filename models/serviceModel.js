const mongoose = require('mongoose');
('use strict');
const mongooseDateFormat = require('mongoose-date-format');

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please specify a title for this service.'],
  },

  subtitle: {
    type: String,
    required: [true, 'Please add a subtitle or brief description.'],
  },

  description: {
    type: String,
    required: [true, 'Please include a detailed description of this service.'],
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },

  photo: { type: String, default: 'default.jpg' },
  active: {
    type: String,
    default: 'true',
    select: 'false',
  },

  availability: {
    type: Array,
  },
});

serviceSchema.plugin(mongooseDateFormat);
const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
