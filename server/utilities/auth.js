const passport = require('passport');
const LocalStrategy = require('passport-local');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const users = require('./users');

passport.use(
  new LocalStrategy({ usernameField: 'email' }, (username, password, done) => {
    const userIsValid = users.some(
      (user) => user.email === username && user.password === password
    );

    if (userIsValid) {
      return done(null, { email: username });
    }

    return done(null, false);
  })
);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    (jwtPayload, done) => {
      const { email } = jwtPayload;
      const userIsValid = users.some((user) => user.email === email);

      if (userIsValid) {
        return done(null, { email });
      }

      return done(null, false);
    }
  )
);

passport.serializeUser((user, cb) => {
  process.nextTick(() => {
    cb(null, { email: user.email });
  });
});

passport.deserializeUser((user, cb) => {
  process.nextTick(() => cb(null, user));
});

module.exports = passport;
