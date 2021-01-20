const API_EVENTS = require('./Router')['API_EVENTS'];
const method = require('./Method');

exports.handler = {
  [API_EVENTS.TEST]: (req, res, next) => {
    var test = method.getTest();
    res.send(test);
  },
};
