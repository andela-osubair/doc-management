import util from 'util';
import model from '../../models/';
import Helpers from '../../helper/Helper';

const User = model.Users;
const Documents = model.Documents;

export default {
  userSearch(req, res) {
    let limit = req.query.limit || 10, offset = req.query.offset || 0;
    if (limit === 'undefined') {
      limit = 10;
    }
    if (offset === 'undefined') {
      offset = 0;
    }
    const query = req.query.q;
    const nextOffset = offset + limit;
    const previousOffset = (offset - limit < 1) ? 0 : offset - limit;
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
        const meta = {
          limit,
          next: util.format(
            '?q=%s&limit=%s&offset=%s', query, limit, nextOffset),
          offset,
          previous: util.format(
            '?q=%s&limit=%s&offset=%s', query, limit, previousOffset),
          total_count: user.length
        };
        const result = Helpers.getPaginatedItems(user, offset, limit);
        return res.status(200).send({
          user: result, pageMeta: meta });
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
