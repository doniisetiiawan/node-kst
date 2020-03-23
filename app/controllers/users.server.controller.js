import { User } from '../models/user.server.model';

function create(req, res, next) {
  const user = new User(req.body);

  user.save((err) => {
    if (err) {
      return next(err);
    }
    res.json(user);
  });
}

function list(req, res, next) {
  User.find({}, (err, users) => {
    if (err) {
      return next(err);
    }
    res.json(users);
  });
}

function read(req, res) {
  res.json(req.user);
}

function update(req, res, next) {
  User.findByIdAndUpdate(
    req.user.id,
    req.body,
    (err, user) => {
      if (err) {
        return next(err);
      }
      res.json(user);
    },
  );
}

function deletex(req, res, next) {
  req.user.remove((err) => {
    if (err) {
      return next(err);
    }
    res.json(req.user);
  });
}

function userByID(req, res, next, id) {
  User.findOne(
    {
      _id: id,
    },
    (err, user) => {
      if (err) {
        return next(err);
      }
      req.user = user;

      next();
    },
  );
}

export {
  create, list, read, userByID, update, deletex,
};
