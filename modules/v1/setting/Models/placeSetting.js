// Qui sono definiti eventuali validatori per i body delle routes che li richiedono
const mongoose = require('mongoose');
const SettingSchema = require('../Schema')['SettingSchema'];

const dbSchema = SettingSchema({
  autoVisible: { type: Boolean, default: false },
  placeTypes: [
    {
      type: String,
      default: [],
    },
  ],
  tags: [
    {
      name: String,
      icon: String,
      color: String,
    },
  ],
  paymentEnabled: { type: Boolean, default: false },
  paymentData: {
    data: {
      accountHolder: String,
      contactEmail: String,
      iban: String,
      causal: String,
    },
  },
  paymentOptions: [
    {
      name: String,
      description: String,
      price: Number,
    },
  ],
});

module.exports = mongoose.model('PlaceSetting', dbSchema, 'settings');
