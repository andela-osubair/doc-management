import jwt from 'jsonwebtoken';
import util from 'util';
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
    let limit = req.query.limit, offset = req.query.offset;
    if (limit === 'undefined') {
      limit = 10;
    }
    if (offset === 'undefined') {
      offset = 0;
    }
    const nextOffset = offset + limit;
    const previousOffset = (offset - limit < 1) ? 0 : offset - limit;
    return User
      .findAll()
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: 'No User Found' });
        }
        const meta = {
          limit,
          next: util.format('?limit=%s&offset=%s', limit, nextOffset),
          offset,
          previous: util.format(
            '?limit=%s&offset=%s', limit, previousOffset),
          total_count: user.length
        };
        const result = Helpers.getPaginatedItems(user, offset, limit);
        return res.status(200).send({
          user: result, pageMeta: meta });
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
  },
  getAllUsers(req, res) {
    return User
      .findAll()
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: 'No Users Found' });
        }
        return res.status(200).send({ user });
      })
      .catch(error => res.status(400).send({
        error, message: 'Error retrieving users' }));
  }
};
