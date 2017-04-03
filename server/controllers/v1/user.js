import jwt from 'jsonwebtoken';
import model from '../../models/';
import Helpers from '../../helper/Helper';

const User = model.Users;
const Documents = model.Documents;
const Roles = model.Roles;
const secret = process.env.SECRET || 'thisisademosecret';

export default {
  create(req, res) {
    return User
      .findOne({
        where: {
          email: req.body.email
        }
      })
      .then((user) => {
        if (user) {
          return res.status(409).send({ message: 'User Already Exists' });
        }
        User.roleId = req.body.roleId || 2;
        User
          .create(req.body)
          .then((newUser) => {
            const token = jwt.sign({
              data:
              { id: newUser.id,
                name: newUser.name,
                username: newUser.username,
                email: newUser.email,
                roleId: newUser.roleId }
            }, secret, {
              expiresIn: '24h' // expires in 24 hours
            });
            return res.status(201).send({
              newUser, message: 'User created successfully', token });
          })
          .catch(error => res.status(400).send({
            error, message: `Error creating ${req.body.name}` }));
      });
  },
  list(req, res) {
    return User
      .findAll({ offset: req.query.offset || 0, limit: req.query.limit || 20 })
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: 'No User Found' });
        }
        return res
          .status(200)
          .send({ status: true, user });
      })
      .catch(error => res.status(400).send({
        error, message: 'Error retrieving users' }));
  },
  retrieve(req, res) {
    return User
      .findById(req.params.id, {
        include: [
          {
            model: Documents,
            as: 'documents'
          }
        ]
      })
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: 'User Not Found' });
        }
        return res
          .status(200)
          .send({ user });
      })
      .catch(error => res.status(400).send({
        error, message: 'Error occurred while retrieving user' }));
  },
  update(req, res) {
    Roles.findById(req.decoded.data.roleId)
    .then(() => {
      if (Helpers.isAdmin(req, res)
        || Helpers.isOwner(req, res)) {
        return User
          .find({ where: {
            id: req.params.id } })
            .then((user) => {
              if (!user) {
                return res.status(404).send({ message: 'User Not Found' });
              }
              return user
              .update(req.body)
                .then(updatedUser => res
                  .status(200).send({ updatedUser,
                    message: 'User updated successfully',

                  }));
            }).catch(error => res.status(400).send({
              error, message: 'Error updating user' }));
      }
      return (res.status(403)
         .send({ message: 'Unauthorized Access' }));
    });
  },
  destroy(req, res) {
    Roles.findById(req.decoded.data.roleId)
    .then(() => {
      if (Helpers.isAdmin(req, res) || Helpers.isOwner(req, res)) {
        return User
          .find({
            where: {
              id: req.params.id
            }
          })
          .then((user) => {
            if (!user) {
              return res.status(404).send({ message: 'User Not Found' });
            }
            return user
              .destroy()
              .then(() => res.status(200).send({
                message: `${user.name} deleted successfully` }));
          })
          .catch(error => res.status(400).send({
            error, message: 'Error deleting user' }));
      }
      return (res.status(403)
         .send({ message: 'Unauthorized Access' }));
    });
  },
  findUserDocuments(req, res) {
    return User
      .findById(req.params.id, {
        include: [
          {
            model: Documents,
            as: 'documents'
          }
        ] })
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: 'User Not Found' });
        }
        return res.status(200).send({ doc: user.documents, status: true });
      })
      .catch(error => res.status(400).send({
        error, message: 'Error occurred while retrieving user document' }));
  },
  getExistingUser(req, res) {
    return User
      .find({
        where: {
          $or: [
            { email: req.params.identifier
            }, {
              username: req.params.identifier
            }
          ]
        }
      })
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: 'User Not Found' });
        }
        return res
          .status(200)
          .send({ user });
      })
      .catch(error => res.status(400).send({
        error, message: 'Error occurred while retrieving user' }));
  }
};
