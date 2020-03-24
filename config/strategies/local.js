import passport from 'passport';

import { Strategy as LocalStrategy } from 'passport-local';

import { User } from '../../app/models/user.server.model';

export default () => {
  passport.use(
    new LocalStrategy((username, password, done) => {
      User.findOne(
        {
          username,
        },
        (err, user) => {
          if (err) {
            return done(err);
          }

          if (!user) {
            return done(null, false, {
              message: 'Unknown user',
            });
          }

          if (!user.authenticate(password)) {
            return done(null, false, {
              message: 'Invalid password',
            });
          }

          return done(null, user);
        },
      );
    }),
  );
};
