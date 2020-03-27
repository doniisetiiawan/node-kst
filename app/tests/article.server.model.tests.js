// eslint-disable-next-line import/no-extraneous-dependencies
import should from 'should';
// eslint-disable-next-line import/no-extraneous-dependencies
import mocha from 'mocha';

import { User } from '../models/user.server.model';
import { Article } from '../models/article.server.model';

const {
  describe, it, beforeEach, afterEach,
} = mocha;

let user;
let article;

describe('Article Model Unit Tests:', () => {
  beforeEach((done) => {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'password',
    });

    user.save(() => {
      article = new Article({
        title: 'Article Title',
        content: 'Article Content',
        user,
      });

      done();
    });
  });

  describe('Testing the save method', () => {
    it('Should be able to save without problems', () => {
      article.save((err) => {
        should.not.exist(err);
      });
    });

    it('Should not be able to save an article without a title', () => {
      article.title = '';

      article.save((err) => {
        should.exist(err);
      });
    });
  });

  afterEach((done) => {
    Article.deleteMany(() => {
      User.deleteMany(() => {
        done();
      });
    });
  });
});
