import index from '../controllers/index.server.controller';

export default (app) => {
  app.get('/', index);
};
