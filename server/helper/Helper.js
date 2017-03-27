import model from '../models';

/**
 * controllers helper functions
 */
const Helpers = {
  /**
   * isAdmin - Verify if the requester is an admin
   * @param  {Object} req Request Object
   * @param  {Object} res Response Object
   * @returns {Boolean} returns true or false
   */
  isAdmin(req, res) {
    return req.decoded.data.roleId === 1;
  },

  /**
   * isOwner - checks if a user is the owner of a document
   * @param {Object} req      Request object
   * @param {Object} res      Response object
   * @param {Object} document the document to compare with
   * @returns {Boolean} returns true or false
   */
  isOwner(req, res, document) {
    const itemToCheck = document ? String(document.userId) : req.params.id;
    return String(req.decoded.data.userId) === itemToCheck;
  },
};

export default Helpers;
