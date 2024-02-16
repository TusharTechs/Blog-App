const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// User registration controller
exports.register = async (req, res) => {
  // Extract user data from request body
  const { username, email, password } = req.body;

  try {
    // Upload image to Cloudinary if it exists
    let profilePictureUrl = '';
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      profilePictureUrl = result.secure_url;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // Use a salt factor of 10

    // Create new user with hashed password and uploaded image URL
    const newUser = new User({ username, email, password: hashedPassword, profilePicture: profilePictureUrl });

    // Save user to database
    await newUser.save();

    res.json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// User login controller
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Create and return JWT token
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get user profile controller
exports.profile = async (req, res) => {
  try {
    // Extract user ID from the token
    const userId = req.user.id;

    // Use the extracted user ID to find the user profile
    const user = await User.findById(userId).select('-password');

    // Send the user profile in the response
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};