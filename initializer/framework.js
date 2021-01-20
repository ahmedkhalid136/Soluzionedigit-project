// The purpose of this file is to combine the 3 files of each module so that they work together

const express = require('express');
const Joi = require('joi');
const _ = require('lodash');

const modules = require('./appModules')['modules'];
const schemas = require('./schemas')['schemas'];
const middlewares = require('./middlewares')['middlewares'];
const handlers = require('./handlers')['handlers'];
const routers = require('./routers')['routers'];

const createRouter = () => (routingContext) => {
  const router = express.Router();
};

const schemaMiddleware = (schema) => (req, res, next) => {
  if (_.isNull(schema)) {
    console.log('The schema is null');
    next();
  } else {
    const result = Joi.validate(req.body, schema);
    // console.log('Req Body: ', req.body);
    result.error === null ? next() : res.status(422).json({ errors: result.error });
    if (result.error) console.log(result.error);
  }
};

const extraMiddleware = (middleware) => (req, res, next) => {
  //dataCompileMiddleware(req, res, next);
  if (_.isNull(middleware)) {
    console.log('The middleware is null');
    next();
  } else {
    middleware(req, res, next);
  }
};

const getRouterPath = (moduleName) => `/${moduleName}`;

const defaulHandler = (req, res) => {
  res.status(404).json({ errors: ' Not Implemented' });
};

const connectRouters = (app) => {
  //console.log('connecting Routers', JSON.stringify(routers));
  _.forEach(modules, (moduleName) => {
    // per ogni modulo specificato in appModules.js, restituito come moduleName
    console.log('#### computing module: ', moduleName);
    const router = express.Router();
    const moduleSchema = schemas[moduleName];
    const moduleMiddleware = middlewares[moduleName];
    const moduleHandler = handlers[moduleName];
    //console.log(JSON.stringify(handlers));
    //console.log('quindi =>',moduleSchema,moduleHandler)
    _.forEach(routers[moduleName], (api, apiKey) => {
      // per ogni route del modulo moduleName, restituito come (api, apiKey)
      console.log('#### computing route: ', api, apiKey, ' of ', moduleName);
      const { path, method } = api;
      const schema = _.isNil(moduleSchema[apiKey]) ? null : moduleSchema[apiKey];
      const middleware = _.isNil(moduleMiddleware[apiKey]) ? null : moduleMiddleware[apiKey];
      const handler = _.isNil(moduleHandler[apiKey]) ? defaulHandler : moduleHandler[apiKey];
      router[_.lowerCase(method)](path, schemaMiddleware(schema), extraMiddleware(middleware), handler);
      //apiDefinition[apiKey] = _.assign(api, schema, handler);
    });
    app.use(getRouterPath(moduleName), router);
  });
};

exports._ = _;
exports.createRouter = createRouter;
exports.express = express;
exports.schemaMiddleware = schemaMiddleware;
exports.connectRouters = connectRouters;
