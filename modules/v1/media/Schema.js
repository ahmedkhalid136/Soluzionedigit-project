// Qui sono definiti eventuali validatori per i body delle routes che li richiedono

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

exports.schema = {
}

const dbSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  filename: {
    type: String,
    index: true
  },
  url: {
    type: String,
    index: true
  },
  fieldname: String,
  originalname: String,
  encoding: String,
  mimetype: String,
  destination: String,
  path: String,
  size: Number,

});

dbSchema.index({'$**': 'text'});

module.exports = mongoose.model('Media', dbSchema, 'medias');