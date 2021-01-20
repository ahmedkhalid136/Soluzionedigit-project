const jwt = require('jsonwebtoken');
const User = require('../modules/'+process.env.API_VERSION+'/user/Schema');

const expTime = "2 days";

// Generate JWT
exports.generateToken = function (data, expire = expTime) {
  return jwt.sign(data, process.env.SECRET, {
    expiresIn: expire // in seconds or string
  });
};

// Decode JWT
exports.verifyToken = function (req, res, next) {
  if (!req.headers.accesstoken) {
    res.status(401).json({ 'result':'error', 'message': 'You must be authorized' });
  } else {
    let token = '';
    if (req.headers.authorization && req.headers.authorization.indexOf(" ") > 0) {
      token = req.headers.authorization.split(" ")[1];
      if (token.length < 5) { //TODO perché 5?
        res.status(401).json({ 'result':'error', 'message': 'You must be authorized' });
        return;
      }
    }
    const accessToken = req.headers.accesstoken;
    if (token.length > 0) {
      return jwt.verify(token, process.env.SECRET, function(err, decoded) {
        if (err) {
          if (err.name == 'TokenExpiredError' && err.message == 'jwt expired') {
            let old_payloads = jwt.decode(token);
            User.findOne({ 'email': old_payloads.data, 'accessToken': accessToken })
              .select('+accessToken')
              .exec((err, user) => {
                if (err) {
                  res.status(500).json({ 'result':'error', 'message': err.message });
                } else {
                  if (!user) {
                    req.user = null;
                    res.status(401).json({ 'result':'error', 'message': 'You must be authorized' });
                  }else {
                    req.user = user;
                    req.user.accessToken = '';
                    req.token = jwt.sign( {'data': user.email} , process.env.SECRET, {expiresIn: expTime});
                    res.setHeader('Authorization', 'Bearer '+req.token);
                    next();
                  }
                }

              });
          }
        } else {
          User.findOne({ 'email': decoded.data })
            .select('+accessToken')
            .exec((err, user) => {
              if (err) {
                res.status(401).json({ 'result':'error', 'message': 'You must be authorized' });
              } else {
                if (!user) {
                  req.user = null;
                  res.status(401).json({ 'result':'error', 'message': 'You must be authorized' });
                }else {
                  if (user.accessToken === accessToken) {
                    req.user = user;
                    req.user.accessToken = '';
                    req.token = jwt.sign( {'data': decoded.data} , process.env.SECRET, {expiresIn: expTime });
                    res.setHeader('Authorization', 'Bearer '+req.token);
                    next();
                  } else {
                    res.status(401).json({ 'result':'error', 'message': 'Operation not permitted, please login again' });
                    user.accessToken = '';
                    user.save();
                  }
                }
              }
            });
        }
      });
    } else {
      User.findOne({ 'accessToken': accessToken })
        .select('+accessToken')
        .exec((err, user) => {
          if (err) {
            res.status(500).json({ 'result':'error', 'message': err.message });
          } else {
            if (!user) {
              req.user = null;
              res.status(401).json({ 'result':'error', 'message': 'You must be authorized' });
            }else {
              req.user = user;
              req.user.accessToken = '';
              req.token = jwt.sign( {'data': user.email} , process.env.SECRET, {expiresIn: expTime});
              res.setHeader('Authorization', 'Bearer '+req.token);
              next();
            }
          }

        });
    }
  }
};

// Decode JWT
exports.decodeToken = function (token) {
  return jwt.verify(token, process.env.SECRET);
};

exports.decodeTokenUnsure = function (token) {
  return jwt.decode(token);
};
