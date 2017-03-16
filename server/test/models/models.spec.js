/* eslint no-unused-expressions: "off"*/

import expect from 'expect';
import model from '../../models/';

process.env.NODE_ENV = 'test';

describe('Create Models', () => {
  it('should have Roles Model', () => {
    expect(model.Roles).toExist();
  });
  it('should have Users Model', () => {
    expect(model.Users).toExist();
  });
  it('should have Documents Model', () => {
    expect(model.Documents).toExist();
  });
  it('should have Shared Model', () => {
    expect(model.Shared).toExist();
  });
});
