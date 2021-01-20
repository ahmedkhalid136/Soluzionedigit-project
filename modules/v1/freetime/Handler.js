// Here are the functions that respond to routes.
// The names of the functions are decided in the API_EVENTS array of the module's ./Router file

const API_EVENTS = require('./Router')['API_EVENTS'];
const method = require('./Method');

exports.handler = {
  [API_EVENTS.GET_FREETIME]: (req, res, next) => {
    method.getFreetime(req, res, next);
  },
  [API_EVENTS.GET_EMPLOYEE_FREETIMES]: (req, res, next) => {
    method.getEmployeeFreetimes(req, res, next);
  },
  [API_EVENTS.POST_FREETIME]: (req, res, next) => {
    method.postFreetime(req, res, next);
  },
  [API_EVENTS.DELETE_FREETIME]: (req, res, next) => {
    method.deleteFreetime(req, res, next);
  },
};
