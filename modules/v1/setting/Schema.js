// Qui sono definiti eventuali validatori per i body delle routes che li richiedono

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

exports.schema = {
}

const dbSchema = new Schema({
  tag: {
    type: String,
    required: true,
    index: true,
    unique: true
   },
   reserved: {
    type: Boolean,
    default: false
   }
});

exports.SettingSchema = function(add) {
  let schema = dbSchema.clone();
  if(add) schema.add(add);
  return schema;
}

dbSchema.index({'$**': 'text'});

exports.model = mongoose.model('Setting', dbSchema, 'settings');