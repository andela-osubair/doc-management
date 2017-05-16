/* eslint no-unused-expressions: "off"*/

import expect from 'expect';
import helper from '../helper/test-helper';
import model from '../../models';

process.env.NODE_ENV = 'test';

const Role = model.Roles;
const newRole = helper.newRole;

describe('Roles Model', () => {
  let role;

  describe('Create Role', () => {
    it('should create new role', (done) => {
      Role.create(newRole)
        .then((createdRole) => {
          role = createdRole;
          expect(role).toExist();
          expect(role).toExist('title');
          done();
        });
    });

    it('created new role should exist', () => {
      expect(role).toExist();
      expect(role).toExist('title');
    });
  });

  describe('Role Validation', () => {
    it('requires title field to create a role', (done) => {
      Role.create()
        .catch((error) => {
          expect(/notNull Violation/.test(error.message)).toBeTruthy;
          done();
        });
    });
    it('ensures a role can only be created once(unique)', (done) => {
      Role.create(newRole)
        .catch((error) => {
          expect(/SequelizeUniqueConstraintError/.test(error.name)).toBeTruthy;
          done();
        });
    });
  });
});
