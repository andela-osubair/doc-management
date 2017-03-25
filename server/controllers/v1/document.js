import model from '../../models/';

const Documents = model.Documents;
// const Users = model.Users;

export default {
  create(req, res) {
    return Documents
      .create({
        title: req.body.title,
        docContent: req.body.docContent,
        viewAccess: req.body.viewAccess,
        userId: req.body.userId
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
        offset: `${req.query.offset}`,
        limit: `${req.query.limit}`,
      })
      .then(document => res.status(200).send(document))
      .catch(error => res.status(400).send({
        error,
        message: 'Error retrieving documents'
      }));
  },
  retrieve(req, res) {
    return Documents
      .findById(req.params.id)
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
          .update({
            title: req.body.title || document.title,
            docContent: req.body.docContent || document.docContent,
            viewAccess: req.body.access || document.viewAccess,
            userId: req.body.userId || document.userId
          })
          .then(updatedDoc => res.status(200).send({
            updatedDoc,
            message: 'Document updated successfully'
          }))
          .catch(error => res.status(400).send({
            error,
            message: `Error updating document: ${document.title}`
          }));
      })
      .catch(error => res.status(400).send({
        error,
        message: 'Error updating document'
      }));
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
          }))
      })
      .catch(error => res.status(400).send({
        error,
        message: 'Error deleting document'
      }));
  },
};
