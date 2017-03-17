import controller from '../controllers/v1';
import middleware from '../middlewares';

const rolesController = controller.roles;
const usersController = controller.user;
const authController = controller.auth;
const docController = controller.document;
const searchController = controller.search;
const auth = middleware.authentication;

const verify = auth.verifyToken;
const adminAccess = auth.adminAccess;
// const userAccess = auth.userAccess;

const Routes = (app) => {
  app.get('/', (req, res) => res.status(200).send({
    message: 'Welcome to the Document Manager API!',
  }));

  /**
   * crud api for roles model
   */
  app.route('/roles')
    .post(verify, adminAccess, rolesController.create)
    .get(verify, adminAccess, rolesController.list);
  app.route('/roles/:id')
    .get(verify, adminAccess, rolesController.retrieve)
    .put(verify, adminAccess, rolesController.update)
    .delete(verify, adminAccess, rolesController.destroy);

  // user authentication
  app.route('/users/login')
    .post(authController.login);

  app.route('/users/logout')
    .post(authController.logout);

  /**
   * crud api for user model
   */
  app.route('/users')
    .post(usersController.create)
    .get(verify, adminAccess, usersController.list);

  app.route('/users/:id')
    .get(verify, usersController.retrieve)
    .put(verify, usersController.update)
    .delete(verify, usersController.destroy);

  app.route('/users/:id/documents')
    .get(verify, usersController.findUserDocuments);

  /**
   * crud api for document model
   */
  app.route('/documents')
    .post(verify, docController.create)
    .get(verify, docController.list);

  app.route('/documents/:id')
    .get(verify, docController.retrieve)
    .put(verify, docController.update)
    .delete(verify, docController.destroy);


  /**
   * Search API
   */
  app.route('/users/search')
    .post((req, res) => {
      res.redirect(`/search/users/?q=${req.body.email}`);
    });

  app.route('/documents/search')
    .post((req, res) => {
      res.redirect(`/search/documents/?q=${req.body.title}`);
    });

  app.route('/search/users/')
    .get(verify, adminAccess, searchController.userSearch);


  app.route('/search/documents/')
    .get(verify, adminAccess, searchController.documentSearch);
};

export default Routes;
