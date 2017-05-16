/* eslint no-unused-expressions: "off"*/

import expect from 'expect';
import helper from '../helper/test-helper';
import model from '../../models';
import invalid from '../helper/invalid-data-helper';

process.env.NODE_ENV = 'test';

const User = model.Users;
const newUser = helper.adminUser;

describe('Users Model', () => {
  let user;

  describe('Create User', () => {
    it('should create new user', (done) => {
      User.create(newUser)
        .then((createdUser) => {
          user = createdUser;
          expect(user).toExist();
          expect(user).toExist('email');
          done();
        });
    });

    it('created new user should have name, email', () => {
      expect(user.name).toEqual(newUser.name);
      expect(user.username).toEqual(newUser.username);
      expect(user.email).toEqual(newUser.email);
    });

    it('should create a user with hashed password', () => {
      expect(user.password).toNotEqual(newUser.password);
    });
  });

  describe('User Validation', () => {
    it('requires name field to create a user', (done) => {
      User.create(invalid.noName)
        .catch((error) => {
          expect(/notNull Violation/.test(error.message)).toBeTruthy;
          done();
        });
    });
    it('requires email field to create a user', (done) => {
      User.create(invalid.noEmail)
        .catch((error) => {
          expect(/notNull Violation/.test(error.message)).toBeTruthy;
          done();
        });
    });
    it('requires username field to create a user', (done) => {
      User.create(invalid.noUsername)
        .catch((error) => {
          expect(/notNull Violation/.test(error.message)).toBeTruthy;
          done();
        });
    });
    it('ensures a user can only be created once(unique)', (done) => {
      User.create(newUser)
        .catch((error) => {
          expect(/SequelizeUniqueConstraintError/.test(error.name)).toBeTruthy;
          done();
        });
    });
    it('ensures a username can only be created once(unique)', (done) => {
      User.create(invalid.uniqueUsername)
        .catch((error) => {
          expect(/SequelizeUniqueConstraintError/.test(error.name)).toBeTruthy;
          done();
        });
    });
  });

  describe('Email Validation', () => {
    it('requires user mail to be authentic', () => {
      User.create(invalid.invalidEmail)
        .catch((error) => {
          expect(/Validation error: Validation isEmail failed/
            .test(error.message)).toBeTruthy;
          expect(/SequelizeValidationError/.test(error.name)).toBeTruthy;
        });
    });

    it('email can not be empty', () => {
      User.create(invalid.emailEmpty)
        .catch((error) => {
          expect(/Validation error: Validation notEmpty failed/
            .test(error.message)).toBeTruthy;
          expect(/SequelizeValidationError/.test(error.name)).toBeTruthy;
        });
    });
  });
  describe('Password Validation', () => {
    it('should be valid if compared', () => {
      User.findById(user.id)
        .then((getUser) => {
          expect(getUser.verifyPassword(newUser.password)).toBeTruthy;
        });
    });

    it('password can not be empty', () => {
      User.create(invalid.passwordEmpty)
        .catch((error) => {
          expect(/Validation error: Validation notEmpty failed/
            .test(error.message)).toBeTruthy;
          expect(/SequelizeValidationError/.test(error.name)).toBeTruthy;
        });
    });
  });
});
