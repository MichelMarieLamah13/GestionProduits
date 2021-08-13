const express = require('express');
const router = express.Router();
const UserController = require('../controllers/users');
const checkAuth = require('../middlewares/check-auth');
const upload = require('../controllers/uploadFile');
// Get all users: GET http://localhost:port/users
router.get('/',UserController.get_all_users);

// Add a user: POST http://localhost:port/users/register
router.post('/register',UserController.register);

// Update user: PATCH http://localhost:port/users/:id
router.patch('/:id', checkAuth, upload.single('imgUsr'), UserController.update_user);

// Login a user: POST http://localhost:port/users/login
router.post('/login',UserController.login);

// Get a user by id: GET http://localhost:port/users/id
router.get('/:id',checkAuth, UserController.get_user_by_id);

// Delete a user by id: DELETE http://localhost:port/users/id
router.delete('/:id',checkAuth, UserController.delete_user);
module.exports = router;