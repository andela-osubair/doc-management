const Routes = (app) => {
  app.get('/', (req, res) => res.status(200).send({
    message: 'Welcome to the Document Manager API!',
  }));
};

export default Routes;
