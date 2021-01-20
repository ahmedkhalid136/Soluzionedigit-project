// Qui sono definiti eventuali validatori per i body delle routes che li richiedono

const { roles } = require('../../../initializer/roles');

exports.roleValidator = function (actions, resource) {
  return async (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'You are not authorized' });

    let result = null;
    actions = Array.isArray(actions) ? actions : Array(actions);

    actions.forEach((action) => {
      let permission = roles.can(req.user.role)[action](resource);
      result = permission && permission.granted ? permission : result;
    });

    if (!result || (result && !result.granted)) {
      return res.status(401).json({ message: 'You are not authorized' });
    }
    next();
  };
};

exports.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) return next();
  res.status(500).json({ message: 'Not Logged In' });
};

exports.middleware = {
  GET_ALL_SETTING: this.roleValidator(['readAny'], 'setting'),
  POST_SETTING: this.roleValidator(['updateAny'], 'setting'),
  DELETE_SETTING: this.roleValidator(['deleteAny'], 'setting'),
};
