import mongoose from 'mongoose';

import config from './config';

export default () => {
  const db = mongoose.connect(config.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  // eslint-disable-next-line global-require
  require('../app/models/user.server.model');

  return db;
};
