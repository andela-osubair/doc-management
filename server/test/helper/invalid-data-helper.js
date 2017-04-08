import faker from 'faker';

const invalid = {
  noName: {
    email: 'orukomi@gmail.com',
    password: 'password',
  },
  noEmail: {
    name: 'oruko mi',
    password: 'password',
  },
  noUsername: {
    name: 'oruko mi',
    email: 'oruko@live.co.uk',
    password: 'password',
  },
  uniqueUsername: {
    name: 'oruko mi',
    username: 'oyendah',
    email: 'oruko@live.co.uk',
    password: 'password',
  },
  invalidEmail: {
    name: 'Temilayooluwa',
    username: 'temi',
    email: 'ttemilayo',
    password: 'password'
  },
  emailEmpty: {
    name: 'Temilayooluwa',
    username: 'temi',
    email: '',
    password: 'password'
  },
  passwordEmpty: {
    name: 'Temilayooluwa',
    username: 'temi',
    email: 'temi@gmail.com',
    password: ''
  },
  emptyTitle: {
    docContent: faker.lorem.paragraph(),
    viewAcces: 'role',
    userId: 2
  },
  invalidRolType: {
    title: 'invalid role type',
    docContent: faker.lorem.paragraph(),
    viewAccess: 'none',
    userId: 2
  },
  emptyEmail: {
    email: '',
    canEdit: true,
    documentId: 1
  },
  nullEmail: {
    canEdit: true,
    documentId: 1
  },
};

export default invalid;
