import {
  list,
  create,
  read,
  hasAuthorization,
  update,
  deletex,
  articleByID
} from '../controllers/articles.server.controller';
import { requiresLogin } from '../controllers/users.server.controller';

export default (app) => {
  app
    .route('/api/articles')
    .get(list)
    .post(requiresLogin, create);

  app
    .route('/api/articles/:articleId')
    .get(read)
    .put(
      requiresLogin,
      hasAuthorization,
      update,
    )
    .delete(
      requiresLogin,
      hasAuthorization,
      deletex,
    );

  app.param('articleId', articleByID);
};
