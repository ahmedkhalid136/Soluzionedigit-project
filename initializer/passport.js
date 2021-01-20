const passport = require('passport');
const i18n = require("i18n");
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../modules/'+process.env.API_VERSION+'/user/Schema');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
      done(err, user);
  });
});

passport.use('localSignup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback : true
  },
  function(req, email, password, done) {
      process.nextTick(function() {
      User.findOne({ 'email' :  email }, function(err, user) {
          if (err)
              return done(err);
          if (user) {
            return done(null, false, { message: i18n.__("AUTH.EMAIL_ALREADY_USED") });
          } else {
            let newUser = new User(req.body);
            newUser.save(function(mErr) {
              return (mErr) ? done(null, false, mErr) : done(null, newUser);
            });
          }
      });
      });
  }));

passport.use('localLogin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback : true
  },
  function(req, email, password, done) {
    User.findOne({ 'email': email  })
    .select('+password')
    .exec( async (err, user) => {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: i18n.__("AUTH.INCORRECT_DATA") });
      }
      let validPassword = await user.validPassword(password);
      if (!validPassword) {
        return done(null, false, { message: i18n.__("AUTH.INCORRECT_DATA") });
      }
      return done(null, user);
    });
  }));

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/api/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
       User.findOrCreate({ googleId: profile.id }, function (err, user) {
         return done(err, user);
       });
  }));

module.exports = passport;