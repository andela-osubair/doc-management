import jwt from 'jsonwebtoken';
import model from '../../models/';

const User = model.Users;
const Documents = model.Documents;
const secret = process.env.SECRET || 'thisisademosecret';

export default {
  create(req, res) {
    return User
      .findOne({
        where: {
          email: req.body.email
        },
      })
      .then((user) => {
        if (user) {
          return res.status(409).send({
            message: 'User Already Exists',
          });
        }
        User.create(req.body)
          .then((newUser) => {
            const token = jwt.sign({ data: newUser }, secret, {
              expiresIn: '24h' // expires in 24 hours
            });
            return res.status(201).send({
              newUser,
              message: 'User created successfully',
              token
            });
          })
          .catch(error => res.status(400).send({
            err: error,
            message: `Error creating ${req.body.name}`
          }));
      })
      .catch(error => res.status(400).send({
        err: error,
        message: 'Error creating new user'
      }));
  },
  list(req, res) {
    return User
      .findAll({
        include: [{
          model: Documents,
          as: 'documents',
        }],
      })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'No User Found',
          });
        }
        return res.status(200).send({
          status: true,
          user,
        });
      })
      .catch(error => res.status(400).send({
        err: error,
        message: 'Error retrieving users'
      }));
  },
  retrieve(req, res) {
    return User
      .findById(req.params.id, {
        include: [{
          model: Documents,
          as: 'documents',
        }],
      })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        return res.status(200).send({ user });
      })
      .catch(error => res.status(400).send({
        err: error,
        message: 'Error occurred while retrieving user'
      }));
  },
  update(req, res) {
    return User
      .find({
        where: {
          id: req.params.id
        },
      })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        if (user.id !== req.decoded.data.id || req.decoded.data.roleId !== 1) {
          return res.status(401)
            .send({ message: 'Not Authorized' });
        }
        return user
          .update({
            name: req.body.name || user.name,
            email: req.body.email || user.email,
            password: req.body.password || user.password,
            roleId: req.body.roleId || user.roleId,
          })
          .then(updatedUser => res.status(200).send({
            updatedUser,
            message: 'User updated successfully'
          }))
          .catch(error => res.status(400).send({
            err: error,
            message: `Error updating user: ${user.name}`
          }));
      })
      .catch(error => res.status(400).send({
        err: error,
        message: 'Error updating user'
      }));
  },
  destroy(req, res) {
    return User
      .find({
        where: {
          id: req.params.id
        },
      })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        if (user.id !== req.decoded.data.id || req.decoded.data.roleId !== 1) {
          return res.status(401)
            .send({ message: 'Not Authorized' });
        }
        return user
          .destroy()
          .then(() => res.status(200).send({
            message: `${user.name} deleted successfully`
          }))
          .catch(error => res.status(400).send({
            err: error,
            message: `Error deleting ${user.name}`
          }));
      })
      .catch(error => res.status(400).send({
        err: error,
        message: 'Error deleting user'
      }));
  },
  findUserDocuments(req, res) {
    return User
      .findById(req.params.id, {
        include: [{
          model: Documents,
          as: 'documents',
        }],
      })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        return res.status(200).send({
          doc: user.documents,
          status: true
        });
      })
      .catch(error => res.status(400).send({
        err: error,
        message: 'Error occurred while retrieving user document'
      }));
  },
};
