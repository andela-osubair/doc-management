import model from '../../models/';

const User = model.Users;
const Documents = model.Documents;

export default {
  userSearch(req, res) {
    return User
      .findAll({
        where: {
          $or: [
            { email: {
              $iLike: `%${req.query.q}%`
            },
              username: {
                $iLike: `%${req.query.q}%`
              } }
          ]
        }
      })
      .then((user) => {
        if (user.length <= 0) {
          return res.status(404)
            .send({
              message: 'Users Not Found',
            });
        }
        return res.status(200)
          .send(user);
      })
    .catch(error => res.status(400).send({
      error,
      message: 'Error occurred while retrieving Users'
    }));
  },

  documentSearch(req, res) {
    return Documents
      .findAll({
        where: {
          $or: [{ title: { $iLike: `%${req.query.q}%` } },
            { docContent: { $iLike: `%${req.query.q}%` } }]
        }
      })
      .then((document) => {
        if (document.length <= 0) {
          return res.status(404)
            .send({
              message: 'Documents Not Found',
            });
        }
        return res.status(200)
          .send(document);
      })
      .catch(error => res.status(400)
        .send({
          error,
          message: 'Error occurred while retrieving documents'
        }));
  }

};
