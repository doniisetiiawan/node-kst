import mongoose from 'mongoose';

import config from './config';

export default () => mongoose.connect(config.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
