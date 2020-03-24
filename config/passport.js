import passport from 'passport';

import { User } from '../app/models/user.server.model';
import local from './strategies/local';

export default () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findOne(
      {
        _id: id,
      },
      '-password -salt',
      (err, user) => {
        done(err, user);
      },
    );
  });

  local();
};
