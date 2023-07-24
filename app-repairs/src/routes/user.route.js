const express = require('express');
const userController = require('../controllers/user.controller');
const validateUserMiddleware = require('../middlewares/validationuser.middleware');

const router = express.Router();

router
  .route('/')
  .get(userController.findAllUsers)
  .post(validateUserMiddleware.validateCreateUser, userController.createUser);

router
  .route('/:id')
  .get(userController.findOneUser)
  .patch(validateUserMiddleware.validateEditeUser, userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
