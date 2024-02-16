const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const authMiddleware = require('../middleware/authMiddleware');
const multerUploads = require('../middleware/upload');

// Blog creation route
router.post('/', authMiddleware.authenticateUser,  multerUploads.single('image'), blogController.create);

// Blog update route
router.put('/:id', authMiddleware.authenticateUser, blogController.update);

// Blog deletion route
router.delete('/:id', authMiddleware.authenticateUser, blogController.delete);

// Get all blogs route
router.get('/', blogController.getAll);

// Get blog by ID route
router.get('/:id', blogController.getById);

module.exports = router;
