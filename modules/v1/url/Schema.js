// Qui sono definiti eventuali validatori per i body delle routes che li richiedono

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

exports.schema = {
}

const dbSchema = new Schema({
  alias: {
    type: String,
    unique : true
  },
  name: String,
  site: String,
  refUrl: String,
  extUrls: {
    android: String,
    desktop: String,
    ios: String
  },
  delay: Number,
  tags: [String],

  status: {
    deeplink: {
      type: Boolean,
      default: false
    },
    archived: {
      type: Boolean,
      default: false
    },
  },
  clicks: [{
    _id: false,
    device: Object,
    refer: String,
    geo: Object,
    timestamp: Date
  }]
});

dbSchema.index({'$**': 'text'});

dbSchema.methods.generateAlias = function() {
  return new Promise(resolve => {
    alias = Math.random().toString(36).slice(2);
    mongoose.model('Url', dbSchema).findOne( { alias: alias } )
    .exec((err, url) => {
        if (url) this.generateAlias();
        else resolve(alias);
    });
  });
};

module.exports = mongoose.model('Url', dbSchema, 'urls');