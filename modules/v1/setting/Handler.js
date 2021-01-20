// Qui ci sono le funzioni che rispondono alle routes. 
//    I nomi delle funzioni sono decisi nell'array API_EVENTS del file ./Router del modulo

const API_EVENTS = require('./Router')['API_EVENTS'];
const method = require('./Method');

exports.handler = {
  [API_EVENTS.GET_SETTING]: (req, res, next) => {
    method.getSetting(req, res, next);
  },
  [API_EVENTS.GET_APP_SETTINGS]: (req, res, next) => {
    method.getAppSettings(req, res, next);
  },
  [API_EVENTS.GET_ALL_SETTINGS]: (req, res, next) => {
    method.getAllSettings(req, res, next);
  },
  [API_EVENTS.POST_SETTING]: (req, res, next) => {
    method.postSetting(req, res, next);
  },
  [API_EVENTS.DELETE_SETTING]: (req, res, next) => {
    method.deleteSetting(req, res, next);
  },
};
