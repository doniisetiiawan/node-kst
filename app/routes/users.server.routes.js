import passport from 'passport';

import {
  renderSignup,
  signup,
  renderSignin,
  signout,
} from '../controllers/users.server.controller';

export default (app) => {
  app
    .route('/signup')
    .get(renderSignup)
    .post(signup);

  app
    .route('/signin')
    .get(renderSignin)
    .post(
      passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/signin',
        failureFlash: true,
      }),
    );

  app.get(
    '/oauth/facebook',
    passport.authenticate('facebook', {
      failureRedirect: '/signin',
    }),
  );
  app.get(
    '/oauth/facebook/callback',
    passport.authenticate('facebook', {
      failureRedirect: '/signin',
      successRedirect: '/',
    }),
  );

  app.get(
    '/oauth/twitter',
    passport.authenticate('twitter', {
      failureRedirect: '/signin',
    }),
  );
  app.get(
    '/oauth/twitter/callback',
    passport.authenticate('twitter', {
      failureRedirect: '/signin',
      successRedirect: '/',
    }),
  );

  app.get(
    '/oauth/google',
    passport.authenticate('google', {
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ],
      failureRedirect: '/signin',
    }),
  );
  app.get(
    '/oauth/google/callback',
    passport.authenticate('google', {
      failureRedirect: '/signin',
      successRedirect: '/',
    }),
  );

  app.get('/signout', signout);
};
