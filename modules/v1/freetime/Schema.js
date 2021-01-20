// Any validators for the bodies of the routes that require them are defined here

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

exports.schema = {};

const dbSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
    index: true,
    required: true,
  },
  type: {
    type: String,
    default: 'absence',
    enum: ['absence', 'holiday', 'permission'],
  },
  state: {
    type: String,
    default: 'pending',
    enum: ['cancelled', 'pending', 'confirmed'],
  },
});

dbSchema.index({ '$**': 'text' });

module.exports = mongoose.model('Freetime', dbSchema, 'freetimes');
