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

  app.get('/signout', signout);
};
