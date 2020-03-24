import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';

import config from '../config';
import { saveOAuthUserProfile } from '../../app/controllers/users.server.controller';

export default () => {
  passport.use(
    new FacebookStrategy(
      {
        clientID: config.fbClientID,
        clientSecret: config.fbClientSecret,
        callbackURL: config.fbCallbackURL,
        passReqToCallback: true,
      },
      (req, accessToken, refreshToken, profile, done) => {
        const providerData = profile._json;
        providerData.accessToken = accessToken;
        providerData.refreshToken = refreshToken;

        const providerUserProfile = {
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          fullName: profile.displayName,
          email: profile.emails[0].value,
          username: profile.username,
          provider: 'facebook',
          providerId: profile.id,
          providerData,
        };

        saveOAuthUserProfile(
          req,
          providerUserProfile,
          done,
        );
      },
    ),
  );
};
