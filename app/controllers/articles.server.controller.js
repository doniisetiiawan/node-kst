import { Article } from '../models/article.server.model';

const getErrorMessage = (err) => {
  if (err.errors) {
    for (const errName in err.errors) {
      if (err.errors[errName].message) return err.errors[errName].message;
    }
  } else {
    return 'Unknown server error';
  }
};

export function create(req, res) {
  const article = new Article(req.body);

  article.creator = req.user;

  article.save((err) => {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err),
      });
    }
    res.json(article);
  });
}

export function list(req, res) {
  Article.find()
    .sort('-created')
    .populate('creator', 'firstName lastName fullName')
    .exec((err, articles) => {
      if (err) {
        return res.status(400).send({
          message: getErrorMessage(err),
        });
      }
      res.json(articles);
    });
}

export function read(req, res) {
  res.json(req.article);
}

export function update(req, res) {
  const { article } = req;

  article.title = req.body.title;
  article.content = req.body.content;

  article.save((err) => {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err),
      });
    }
    res.json(article);
  });
}

export function deletex(req, res) {
  const { article } = req;

  article.remove((err) => {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err),
      });
    }
    res.json(article);
  });
}

export function articleByID(req, res, next, id) {
  Article.findById(id)
    .populate('creator', 'firstName lastName fullName')
    .exec((err, article) => {
      if (err) return next(err);
      if (!article) {
        return next(
          new Error(`Failed to load article ${id}`),
        );
      }

      req.article = article;

      next();
    });
}

export function hasAuthorization(req, res, next) {
  if (req.article.creator.id !== req.user.id) {
    return res.status(403).send({
      message: 'User is not authorized',
    });
  }

  next();
}
