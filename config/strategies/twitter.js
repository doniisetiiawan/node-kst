import passport from 'passport';
import { Strategy as TwitterStrategy } from 'passport-twitter';

import config from '../config';
import { saveOAuthUserProfile } from '../../app/controllers/users.server.controller';

export default () => {
  passport.use(
    new TwitterStrategy(
      {
        consumerKey: config.twClientID,
        consumerSecret: config.twClientSecret,
        callbackURL: config.twCallbackURL,
        passReqToCallback: true,
      },
      (req, token, tokenSecret, profile, done) => {
        const providerData = profile._json;
        providerData.token = token;
        providerData.tokenSecret = tokenSecret;

        const providerUserProfile = {
          fullName: profile.displayName,
          username: profile.username,
          provider: 'twitter',
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
