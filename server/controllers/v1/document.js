import model from '../../models/';
import Helpers from '../../helper/Helper';

const Documents = model.Documents;
const Roles = model.Roles;
const User = model.Users;

export default {
  create(req, res) {
    return Documents
      .create({
        title: req.body.title,
        docContent: req.body.docContent,
        viewAccess: req.body.viewAccess,
        userId: req.body.userId,
        role: req.body.role
      })
      .then(document => res.status(201).send({
        document,
        message: 'Document created successfully.'
      }))
      .catch(error => res.status(400).send({
        error,
        message: 'An error occured while creating document'
      }));
  },

  list(req, res) {
    return Documents
      .findAll({
        offset: req.query.offset || 0,
        limit: req.query.limit || 20,
        include: [User],
        order: [['updatedAt', 'DESC']]
      })
      .then(document => res.status(200).send(document))
      .catch(error => res.status(400).send({
        error,
        message: 'Error retrieving documents'
      }));
  },

  retrieve(req, res) {
    return Documents
      .findById(req.params.id, {
        include: [User],
      })
      .then((document) => {
        if (!document) {
          return res.status(404).send({
            message: 'Document Not Found',
          });
        }
        return res.status(200).send(document);
      })
      .catch(error => res.status(400).send({
        error,
        message: 'Error occurred while retrieving documents'
      }));
  },

  findAllUserDocument(req, res) {
    return Documents
    .findAll({
      where: {
        $or: [
          { viewAccess: 'public' },
          {
            role: String(req.decoded.data.roleId)
          },
          {
            userId: req.params.id
          }
        ]
      },
      include: [User],
      order: [['updatedAt', 'DESC']]
    })
    .then((document) => {
      if (!document) {
        return res.status(404).send({
          message: 'Document Not Found',
        });
      }
      return res.status(200).send(document);
    })
    .catch(error => res.status(400).send({
      error,
      message: 'Error occurred while retrieving documents'
    }));
  },

  update(req, res) {
    Roles.findById(req.decoded.data.roleId)
    .then(() => {
      return Documents
        .find({ where: {
          id: req.params.id } })
          .then((document) => {
            if (!document) {
              return res.status(404).send({
                message: 'Document Not Found',
              });
            }
            if (Helpers.isAdmin(req, res)
            || Helpers.isOwner(req, res, document)) {
              return document
              .update(req.body)
              .then(updatedDoc => res.status(200).send({
                updatedDoc,
                message: 'Document updated successfully'
              }));
            }
            return (res.status(403)
               .send({ message: 'Unauthorized Access' }));
          })
          .catch(error => res.status(400).send({
            error,
            message: 'Error updating document'
          }));
    });
  },

  destroy(req, res) {
    return Documents
      .find({
        where: {
          id: req.params.id
        },
      })
      .then((document) => {
        if (!document) {
          return res.status(404).send({
            message: 'Document Not Found',
          });
        }

        return document
          .destroy()
          .then(() => res.status(200).send({
            message: `${document.title}, was successfully deleted`
          }));
      })
      .catch(error => res.status(400).send({
        error,
        message: 'Error deleting document'
      }));
  },
};
