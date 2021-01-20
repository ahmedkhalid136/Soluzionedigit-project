
const mongoose = require('mongoose');
const Schema = mongoose.Schema
const utilities = require('./utilities');

LocationType = function LocationType(key, options) {
    mongoose.SchemaType.call(this, key, options, 'LocationType');
}
LocationType.prototype = Object.create(mongoose.SchemaType.prototype);

LocationType.prototype.cast = function(val) {
  if (!utilities.isEmpty(val)) {
    const _val = {
        latitude: val.latitude,
        longitude: val.longitude,
        short_address: val.short_address
    };
    if (val.address) {
      _val.address = {
        road: val.address.road,
        town: val.address.town,
        county: val.address.county,
        postcode: val.address.postcode,
        country: val.address.country
      };
    }
    // if(!(_val.latitude      && typeof _val.latitude        == 'number')) throw new Error('Latitude required');
    // if(!(_val.longitude     && typeof _val.longitude       == 'number')) throw new Error('Longitude required');
    // if(!(_val.short_address && typeof _val.short_address   == 'string')) throw new Error('Short address required');

    return _val;
  }
  return null;
}

exports.LocationType = mongoose.Schema.Types.LocationType = LocationType;

exports.haversineDistance = function haversineDistance(coords1, coords2) {
    var toRad = function(x) {
      return x * Math.PI / 180;
    }

    var lon1 = coords1.longitude;
    var lat1 = coords1.latitude;

    var lon2 = coords2.longitude;
    var lat2 = coords2.latitude;

    var R = 6371; // km

    var x1 = lat2 - lat1;
    var dLat = toRad(x1);
    var x2 = lon2 - lon1;
    var dLon = toRad(x2);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;

    return d;
}