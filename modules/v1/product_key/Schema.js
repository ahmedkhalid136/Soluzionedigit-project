// Qui sono definiti eventuali validatori per i body delle routes che li richiedono

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Media = require('../media/Method');

exports.schema = {};

const dbSchema = new Schema({
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'ProductKey',
  },
  tag: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    default: 0,
    required: true,
  },
  img: [
    {
      _id: false,
      type: String,
      default: '',
    },
  ],
  productType: {
    type: String,
    enum: ['performance', 'coupon'],
  },
});

dbSchema.index({ '$**': 'text' });

dbSchema.pre('remove', function (next) {
  Media.freeFiles(this.img, []);
  this.model('ProductKey').remove({ parent: this._id }).exec(next);
});

module.exports = mongoose.model('ProductKey', dbSchema, 'productKeys');
