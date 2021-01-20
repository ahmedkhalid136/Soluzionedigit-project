// Here are the possible routes of the module.
// In API_EVENTS the names of the available functions are defined (obj also accessible internally because with double definition)
// In testAPI the paths and methods corresponding to the above functions are decided (obj not accessible internally, but accesses API_EVENTS)

// The base path of the api matches the module name! (TIP: optionally it is possible to export a string that defines this basepath)

exports.API_EVENTS = API_EVENTS = {
  GET_FREETIME: 'GET_FREETIME',
  GET_EMPLOYEE_FREETIMES: 'GET_EMPLOYEE_FREETIMES',
  POST_FREETIME: 'POST_FREETIME',
  DELETE_FREETIME: 'DELETE_FREETIME',
};

exports.freetimeAPI = {
  [API_EVENTS.GET_FREETIME]: {
    method: 'GET',
    path: '/:_id',
  },
  [API_EVENTS.GET_EMPLOYEE_FREETIMES]: {
    method: 'GET',
    path: '/employee/:_id',
  },
  [API_EVENTS.POST_FREETIME]: {
    method: 'POST',
    path: '/',
  },
  [API_EVENTS.DELETE_FREETIME]: {
    method: 'DELETE',
    path: '/:_id',
  },
};
