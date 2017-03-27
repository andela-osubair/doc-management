import faker from 'faker';
import db from '../../models/';

export const roles = [{
  title: 'administrator'
}, {
  title: 'regular'
}];

export const users = [{
  name: 'Subair Oyindamola',
  username: 'oyendah',
  email: 'oyendah@gmail.com',
  password: 'password',
  roleId: 1
}, {
  name: 'Modupe Omoware',
  username: 'dupe',
  email: 'modupe@gmail.com',
  password: 'password',
  roleId: 2
}];

export const documents = [{
  title: 'seed document test',
  docContent: faker.lorem.paragraph(),
  viewAccess: 'private',
  userId: 1,
  role: '1'
}, {
  title: 'public seed document test',
  docContent: faker.lorem.paragraph(),
  viewAccess: 'public',
  userId: 1,
  role: '1'
}];

const seeds = () => {
  db.sequelize.sync({ force: true }).then(() => {
    // Table created
    db.Roles.bulkCreate(roles);
    db.Users.bulkCreate(users, { individualHooks: true }).then(() => {
      db.Documents.bulkCreate(documents);
    });
  });
};

export default seeds();
