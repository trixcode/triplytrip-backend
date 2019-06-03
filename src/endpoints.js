const initializeEndpoint = app => {
  /**
   * @swagger
   * /users:
   *    get:
   *      description: This should return all user
   * /users/:id:
   *    get:
   *      description: This should return user by id
   */

  app.get('/users', (req, res) => res.end('This should return all users'));
  app.get('/users/:id', (req, res) => res.end(`this should return get user by id ${req.params.id}`))
};

module.exports = initializeEndpoint;