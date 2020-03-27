/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
// eslint-disable-next-line no-unused-vars
import should from 'should';
import mocha from 'mocha';

import app from '../../server';

import { User } from '../models/user.server.model';
import { Article } from '../models/article.server.model';

const {
  describe, it, beforeEach, afterEach,
} = mocha;

let user;
let article;

describe('Article Controller Unit Tests:', () => {
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

      article.save((err) => {
        console.log(err);
        done();
      });
    });
  });

  describe('Testing the GET methods', () => {
    it('Should be able to get the list of articles', (done) => {
      request(app)
        .get('/api/articles/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);
          res.body[0].should.have.property(
            'title',
            article.title,
          );
          res.body[0].should.have.property(
            'content',
            article.content,
          );

          done();
        });
    });

    it('Should be able to get the specific article', (done) => {
      request(app)
        .get(`/api/articles/${article.id}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          res.body.should.be.an.instanceOf(Object).and.have.property(
            'title',
            article.title,
          );
          res.body.should.have.property(
            'content',
            article.content,
          );

          done();
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
