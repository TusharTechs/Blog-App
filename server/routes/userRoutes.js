const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const multerUploads = require('../middleware/upload');

// User registration route
router.post('/register', multerUploads.single('profilePicture'), userController.register);
// User login route
router.post('/login', userController.login);

// User profile route
router.get('/profile/:id', authMiddleware.authenticateUser, userController.profile);

module.exports = router;
