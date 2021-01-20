const appModules = require('./appModules')['modules'];
const _ = require('lodash');

exports.middlewares = _(appModules)
  .mapKeys(module => module)
  .mapValues((module) => {
    try {
      // console.log('middleware.js returns => ',require(`../modules/${module}/Schema`)['schema']);
      return require(`../modules/${process.env.API_VERSION}/${module}/Middleware`)['middleware']; // returns => { POST: joyObj } (il contenuto di Schema.js)
    } catch (error) {
      console.log(error);
      throw 'Middleware names are not configured properly';
    }
  }).value();
