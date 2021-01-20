// Qui sono definiti eventuali validatori per i body delle routes che li richiedono

const LocationType = require('../../../utility/location')['LocationType'];
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Media = require('../media/Method');

const Joi = require('joi');
const bcrypt = require('bcrypt');

const userValidator = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().alphanum().required(),
  role: Joi.string(),
  //accessToken: Joi.string(),
});

exports.schema = {
  LOGIN: userValidator,
  SIGNUP: userValidator,
};

/* User Schema TODO
    Statistiche !!!

*/
const dbSchema = new Schema({
  // significant fields
  username: {
    type: String,
    required: false,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  img: [
    {
      _id: false,
      type: String,
      default: '',
    },
  ],
  name: {
    type: String,
    required: true,
  },
  surname: String,

  // extra fields
  phone: String,
  birthday: Date,
  gender: {
    type: String,
    enum: ['female', 'male', 'other'],
  },
  location: LocationType,

  // account fields
  os_id: String,
  googleId: String,
  locale: {
    type: String,
    default: 'it',
  },
  provider: {
    type: String,
    default: 'local',
    enum: ['local', 'apple', 'google'],
  },
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'admin', 'sdmin'],
  },
  status: {
    mailVerified: {
      type: Boolean,
      default: false,
    },
    passwordReset: {
      type: Boolean,
      default: false,
    },
  },
  privacy: {
    policy: {
      signed: { type: Boolean, default: false },
      onDate: Date,
    },
    isAdult: {
      signed: { type: Boolean, default: false },
      onDate: Date,
    },
    marketingClient: {
      signed: { type: Boolean, default: false },
      onDate: Date,
    },
    marketingSD: {
      signed: { type: Boolean, default: false },
      onDate: Date,
    },
  },
  notification: {
    enabled: { type: Boolean, default: false },
  },
  products: [
    {
      _id: false,
      product: String,
      redeemCode: String,
      redeemed: Boolean,
    },
  ],

  // stats fields
  stats: {
    lastLogin: Date,
    device: {
      os: { type: String, enum: ['android', 'ios'] },
    },
  },
});

dbSchema.index({ '$**': 'text' });

dbSchema.pre('save', async function (next) {
  if (this.isNew) {
    this.password = await this.hashPassword(this.password);
  }
  next();
});

dbSchema.pre('remove', function (next) {
  Media.freeFiles(this.img, []);
  this.model('Booking').remove({ owner: this._id }).exec(next);
  this.model('Employee').remove({ user: this._id }).exec(next);
  this.model('Notification')
    .update({}, { $pull: { user_ids: this._id } }, { multi: true })
    .exec(next);
  this.model('Product').remove({ owner: this._id }).exec(next);
  this.model('Subuser').remove({ owner: this._id }).exec(next);
});

dbSchema.methods.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

dbSchema.methods.validPassword = async function (plainPassword) {
  if (this.password && this.password != '' && plainPassword && plainPassword != '') return await bcrypt.compareSync(plainPassword, this.password);
  return false;
};

module.exports = mongoose.model('User', dbSchema, 'users');
