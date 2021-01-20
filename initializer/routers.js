const appModules = require('./appModules')['modules'];
const _ = require('lodash');

exports.routers = _(appModules)
  .mapKeys(module => module)
  .mapValues((routerName) => {
  try {
    return require(`../modules/${process.env.API_VERSION}/${routerName}/Router`)[`${routerName}`+'API'];
  } catch (error) {
    console.log(error);
    throw 'Router names are not configured properly';
  }
}).value();
