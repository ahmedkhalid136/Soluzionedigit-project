// Qui sono definiti eventuali validatori per i body delle routes che li richiedono

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const WorktimeType = require('../../../utility/worktime')['WorktimeType'];
const moment = require('moment');

exports.schema = {};

const dbSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    default: '',
  },
  timeSlot: {
    duration: {
      type: Number,
    },
  },
  status: {
    visible: {
      type: Boolean,
      default: true,
    },
    bookable: {
      type: Boolean,
      default: true,
    },
  },
  worktime: [
    {
      _id: false,
      date: String,
      days: WorktimeType,
    },
  ],
  workshifts: [
    {
      _id: false,
      fromDate: String,
      shift: {
        type: Schema.Types.ObjectId,
        ref: 'Workshift',
      },
    },
  ],

  /* TODO to implement
  hoursAmount: {
    holidays: {
      tot: Number,
      remaining: Number
    },
    permissions: {
      tot: Number,
      remaining: Number
    },
    yearHours: {
      tot: Number,
      remaining: Number
    },
    totHours: {
      tot: Number,
      remaining: Number
    }
  }
  review:[{
    type: Schema.Types.ObjectId,
    ref: 'Review'
  }],
  division: {
    type: Schema.Types.ObjectId,
    ref: 'StaffDivision'
  },
  */
});

dbSchema.index({ '$**': 'text' });

dbSchema.pre('remove', function (next) {
  this.model('Freetime').remove({ owner: this._id }).exec();
  this.model('Booking')
    .find({ employees: this._id })
    .lean()
    .exec((err, bookings) => {
      for (let i = 0; i < bookings.length; i++) {
        let index = -1;
        for (let j = 0; j < bookings[i].employees.length; j++) {
          if (bookings[i].employees[j].equals(this._id)) index = j;
        }
        if (index >= 0) {
          bookings[i].employees.splice(index, 1);
          if (bookings[i].employees.length === 0) {
            this.model('Booking').findByIdAndDelete(bookings[i]._id).exec();
          } else {
            this.model('Booking').findByIdAndUpdate(bookings[i]._id, bookings[i]).exec();
          }
        }
      }
    });
  next();
});

module.exports = mongoose.model('Employee', dbSchema, 'employees');
