// Qui sono definiti eventuali validatori per i body delle routes che li richiedono
const mongoose = require('mongoose');
const SettingSchema = require('../Schema')['SettingSchema'];

const dbSchema = SettingSchema({
  coupon: {
    enabled: {type: Boolean, default: false},
    bookable: {type: Boolean, default: false},
    
    autoDelete: {type: Boolean, default: false},
    defaultCondition: {type: String},
    perUser: {type: Number, default: 1},
  },
});

module.exports = mongoose.model('ProductSetting', dbSchema, 'settings');