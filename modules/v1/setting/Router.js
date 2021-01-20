// Qui ci sono le possibili routes del modulo. 
//    In API_EVENTS sono definiti i nomi delle funzioni disponibili (obj accessibile anche internamente perche con doppia definizione)
//    In userAPI sono decisi i path ed i metodi rispondenti alle funzioni sopra (obj non accessibile internamente, ma accede a API_EVENTS)

// Il path base dell'api corrisponde al nome del modulo! ( TIP: eventualmente è possibile esportare una stringa che definisce tale basepath )

exports.API_EVENTS = API_EVENTS = {
  GET_SETTING: 'GET_SETTING',
  GET_APP_SETTINGS: 'GET_APP_SETTINGS',
  GET_ALL_SETTINGS: 'GET_ALL_SETTINGS',
  POST_SETTING: 'POST_SETTING',
  DELETE_SETTING: 'DELETE_SETTING',
};

exports.settingAPI = {
  [API_EVENTS.GET_SETTING]: {
    method: 'GET',
    path: '/by/tag/:tag'
  },
  [API_EVENTS.GET_APP_SETTINGS]: {
    method: 'GET',
    path: '/app'
  },
  [API_EVENTS.GET_ALL_SETTINGS]: {
    method: 'GET',
    path: '/all'
  },
  [API_EVENTS.POST_SETTING]: {
    method: 'POST',
    path: '/:tag'
  },
  [API_EVENTS.DELETE_SETTING]: {
    method: 'DELETE',
    path: '/:tag'
  }
};

