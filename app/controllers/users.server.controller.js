import { User } from '../models/user.server.model';

const getErrorMessage = (err) => {
  let message = '';

  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = 'Username already exists';
        break;
      default:
        message = 'Something went wrong';
    }
  } else {
    for (const errName in err.errors) {
      if (err.errors[errName].message) message = err.errors[errName].message;
    }
  }

  return message;
};

// eslint-disable-next-line no-unused-vars
export function renderSignin(req, res, next) {
  if (!req.user) {
    res.send({
      title: 'Sign-in Form',
      messages: req.flash('error') || req.flash('info'),
    });
  } else {
    return res.redirect('/');
  }
}

// eslint-disable-next-line no-unused-vars
export function renderSignup(req, res, next) {
  if (!req.user) {
    res.send({
      title: 'Sign-up Form',
      messages: req.flash('error'),
    });
  } else {
    return res.redirect('/');
  }
}

export function signup(req, res, next) {
  if (!req.user) {
    const user = new User(req.body);
    const message = null;

    user.provider = 'local';

    user.save((err) => {
      if (err) {
        const message = getErrorMessage(err);

        req.flash('error', message);

        return res.redirect('/signup');
      }

      req.login(user, (err) => {
        if (err) return next(err);

        return res.redirect('/');
      });
    });
  } else {
    return res.redirect('/');
  }
}

export function saveOAuthUserProfile(req, profile, done) {
  User.findOne(
    {
      provider: profile.provider,
      providerId: profile.providerId,
    },
    (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        const possibleUsername = profile.username
          || (profile.email
            ? profile.email.split('@')[0]
            : '');

        User.findUniqueUsername(
          possibleUsername,
          null,
          (availableUsername) => {
            profile.username = availableUsername;

            user = new User(profile);

            user.save((err) => done(err, user));
          },
        );
      } else {
        return done(err, user);
      }
    },
  );
}

export function signout(req, res) {
  req.logout();

  res.redirect('/');
}

export function requiresLogin(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(401).send({
      message: 'User is not logged in',
    });
  }

  next();
}
