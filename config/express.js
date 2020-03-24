import express from 'express';
import morgan from 'morgan';
import compress from 'compression';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import session from 'express-session';
import passport from 'passport';
import flash from 'connect-flash';

import config from './config';
import routes from '../app/routes/index.server.routes';
import users from '../app/routes/users.server.routes';
import articles from '../app/routes/articles.server.routes';

export default () => {
  const app = express();

  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else if (process.env.NODE_ENV === 'production') {
    app.use(compress());
  }

  app.use(
    bodyParser.urlencoded({
      extended: true,
    }),
  );
  app.use(bodyParser.json());
  app.use(methodOverride());

  app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: config.sessionSecret,
  }));

  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());

  routes(app);
  users(app);
  articles(app);

  app.use(express.static('./public'));

  return app;
};
