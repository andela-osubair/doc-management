import model from '../../models/';

const Roles = model.Roles;
const Users = model.Users;

export default {
  create(req, res) {
    return Roles
      .create({
        title: req.body.title,
      })
      .then(role => res.status(201).send({
        role,
        message: 'Role created succesfully'
      }))
      .catch(error => res.status(400).send({
        error,
        message: 'Error creating new role'
      }));
  },

  list(req, res) {
    return Roles
      .findAll()
      .then((role) => {
        if (!role) {
          return res.status(404).send({
            message: 'Roles Not Found',
          });
        }
        return res.status(200).send({ role });
      })
      .catch(error => res.status(400).send({
        error,
        message: 'Error retrieving all roles'
      }));
  },

  retrieve(req, res) {
    return Roles
      .findById(req.params.id, {
        include: [{
          model: Users,
          as: 'users',
        }],
      })
      .then((role) => {
        if (!role) {
          return res.status(404).send({
            message: 'Role Not Found',
          });
        }
        return res.status(200).send({ role });
      })
      .catch(error => res.status(400).send({
        error,
        message: 'Error occured while retrieving role'
      }));
  },

  update(req, res) {
    return Roles
      .findById(req.params.id)
      .then((role) => {
        if (!role) {
          return res.status(404).send({
            message: 'Role Not Found',
          });
        }
        return role
          .update({
            title: req.body.title || role.title,
          })
          .then(() => res.status(200).send({
            role,
            message: 'Role updated successfully.'
          }))
          .catch(error => res.status(400).send({
            error,
            message: 'Role did not update successfully.'
          }));
      })
      .catch(error => res.status(400).send({
        error,
        message: 'Error updating role'
      }));
  },

  destroy(req, res) {
    return Roles
      .findById(req.params.id)
      .then((role) => {
        if (!role) {
          return res.status(404).send({
            message: 'Role Not Found',
          });
        }
        return role
          .destroy()
          .then(() => res.status(200).send({
            message: 'Role deleted successfully.'
          }));
      })
      .catch(error => res.status(400).send({
        error,
        message: 'Error deleting Role.'
      }));
  },
};
