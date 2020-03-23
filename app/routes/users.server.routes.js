import {
  create as createusers,
  list as listusers,
  read as readusers,
  userByID as userByIDusers,
  update as updateusers,
  deletex as deleteusers,
} from '../controllers/users.server.controller';

export default (app) => {
  app
    .route('/users')
    .post(createusers)
    .get(listusers);

  app
    .route('/users/:userId')
    .get(readusers)
    .put(updateusers)
    .delete(deleteusers);

  app.param('userId', userByIDusers);
};
