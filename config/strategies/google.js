import passport from 'passport';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';

import config from '../config';
import { saveOAuthUserProfile } from '../../app/controllers/users.server.controller';

export default () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: config.gClientID,
        clientSecret: config.gClientSecret,
        callbackURL: config.gCallbackURL,
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
          provider: 'google',
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
