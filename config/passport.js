import passport from 'passport';

import { User } from '../app/models/user.server.model';
import local from './strategies/local';
import facebook from './strategies/facebook';
import twitter from './strategies/twitter';
import google from './strategies/google';

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
  facebook();
  twitter();
  google();
};
