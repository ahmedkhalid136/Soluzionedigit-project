// Qui sono definiti eventuali validatori per i body delle routes che li richiedono

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Media = require('../media/Method');

exports.schema = {};

const dbSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  place: {
    type: Schema.Types.ObjectId,
    ref: 'Place',
  },
  employees: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
    },
  ],

  status: {
    visible: {
      type: Boolean,
      default: true,
    },
    bookable: {
      type: Boolean,
      default: false,
    },
  },
  type: {
    type: String,
    required: true,
    default: 'regular',
    enum: ['regular', 'reserved'],
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
  description: {
    type: String,
    default: '',
  },
  condition: String,
  price: {
    type: Number,
    min: 0,
  },
  salePrice: {
    type: Number,
    min: 0,
  },
  quantity: {
    type: Number,
    min: 0,
  },
  required: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  timeData: {
    days: [
      {
        type: String,
        default: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
      },
    ],
    duration: Number,
    expirationDate: Date,
  },
  required: [
    {
      type: String,
    },
  ],
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: 'ProductKey',
    },
  ],
});

dbSchema.index({ '$**': 'text' });

dbSchema.pre('remove', function (next) {
  Media.freeFiles(this.img, []);
  this.model('Booking')
    .update({}, { $pull: { products: this._id } }, { multi: true })
    .exec(next);
});

exports.product = mongoose.model('Product', dbSchema, 'products');
exports.coupon = mongoose.model('Coupon', dbSchema, 'coupons');
exports.performance = mongoose.model('Performance', dbSchema, 'performances');
