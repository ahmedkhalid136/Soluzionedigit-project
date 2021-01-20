exports.API_EVENTS = API_EVENTS = {
  TEST: 'TEST',
};

exports.testAPI = {
  [API_EVENTS.TEST]: {
    method: 'GET',
    path: '/',
  },
};
