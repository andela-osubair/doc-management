/* eslint no-unused-expressions: "off"*/

// import { agent } from 'supertest';
import expect from 'expect';

// import app from '../../../bin/www';
import newData from '../helper/test-helper';
import model from '../../models';

process.env.NODE_ENV = 'test';

// This agent refers to PORT where program is runninng.
// const server = agent(app);
const Role = model.Roles;
const newRole = newData.newRole;

describe('Roles Model', () => {
  let role;

  describe('Create Role', () => {
    it('should create new role', (done) => {
      Role.create(newRole)
        .then((createdRole) => {
          role = createdRole;
          done();
        });
    });

    it('created new role should exist', () => {
      expect(role).toExist();
      expect(role).toIncludeKeys('title');
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
