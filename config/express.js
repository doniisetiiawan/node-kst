import express from 'express';
import morgan from 'morgan';
import compress from 'compression';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import session from 'express-session';
import passport from 'passport';
import flash from 'connect-flash';
import http from 'http';
import socketio from 'socket.io';
import MongoStorex from 'connect-mongo';

import config from './config';
import routes from '../app/routes/index.server.routes';
import users from '../app/routes/users.server.routes';
import articles from '../app/routes/articles.server.routes';
import socketiox from './socketio';

const MongoStore = MongoStorex(session);

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

  const mongoStore = new MongoStore({
    url: config.db,
  });

  app.use(
    session({
      saveUninitialized: true,
      resave: true,
      secret: config.sessionSecret,
      store: mongoStore,
    }),
  );

  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());

  routes(app);
  users(app);
  articles(app);

  app.use(express.static('./public'));

  const server = http.createServer(app);
  const io = socketio.listen(server);

  socketiox(server, io, mongoStore);

  return server;
};
