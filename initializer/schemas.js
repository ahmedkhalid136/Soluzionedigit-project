const appModules = require('./appModules')['modules'];
const _ = require('lodash');

exports.schemas = _(appModules)
  .mapKeys(module => module)
  .mapValues((module) => {
    try {
      // console.log('schemas.js returns => ',require(`../modules/${module}/Schema`)['schema']);
      return require(`../modules/${process.env.API_VERSION}/${module}/Schema`)['schema']; // returns => { POST: joyObj } (il contenuto di Schema.js)
    } catch (error) {
      console.log(error);
      throw 'Schema names are not configured properly';
    }
  }).value();

