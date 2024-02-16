const Blog = require('../models/Blog');
const cloudinary = require('cloudinary').v2;

// Initialize Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Blog creation controller
exports.create = async (req, res) => {
  const { heading, body } = req.body;

  try {
    let imageUrl = '';

    // Check if an image was uploaded
    if (req.file) {
      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url; // Get the secure URL of the uploaded image
    }

    const newBlog = new Blog({
      image: imageUrl,
      heading,
      body,
      author: req.user.id,
    });

    const blog = await newBlog.save();
    res.json(blog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Blog update controller
exports.update = async (req, res) => {
  const { heading, body } = req.body;

  try {
    let blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ msg: 'Blog not found' });
    }

    // Check if user owns the blog
    if (blog.author.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    blog.heading = heading;
    blog.body = body;

    blog = await blog.save();
    res.json(blog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Blog deletion controller
exports.delete = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({ msg: 'Blog not found' });
    }

    // Check if user owns the blog
    if (blog.author.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    res.json({ msg: 'Blog deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get all blogs controller
exports.getAll = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', '-password');
    res.json(blogs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get blog by ID controller
exports.getById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', '-password');

    if (!blog) {
      return res.status(404).json({ msg: 'Blog not found' });
    }

    res.json(blog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
