// Qui sono definiti eventuali validatori per i body delle routes che li richiedono

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const LocationType = require('../../../utility/location')['LocationType'];
const WorktimeType = require('../../../utility/worktime')['WorktimeType'];
const Media = require('../media/Method');

exports.schema = {};

const dbSchema = new Schema({
  owner: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  ],
  url: {
    type: Schema.Types.ObjectId,
    ref: 'Url',
  },
  name: { type: String, default: '', required: true },
  description: { type: String, default: '', required: true },
  img: [
    {
      _id: false,
      type: String,
      default: '',
    },
  ],
  cover: [
    {
      _id: false,
      type: String,
      default: '',
    },
  ],
  tags: [
    {
      name: String,
      icon: String,
      color: String,
    },
  ],

  worktime: WorktimeType,
  location: LocationType,
  phone: { type: String, default: '' },
  email: { type: String, default: '' },
  pec: { type: String, default: '' },
  website: { type: String, default: '' },
  types: [
    {
      type: String,
      default: [],
      enum: ['featured'],
    },
  ],

  bill: {
    name: String,
    address: String,
    phone: String,
    vat: String,
    eid: String,
  },

  status: {
    approved: {
      type: Boolean,
      default: false,
    },
    visible: {
      type: Boolean,
      default: false,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    expiry: {
      type: Date,
      default: '',
    },
  },
});

dbSchema.index({ '$**': 'text' });

dbSchema.pre('remove', async function (next) {
  Media.freeFiles(this.img, []);
  next();
});

module.exports = mongoose.model('Place', dbSchema, 'places');
