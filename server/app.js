const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Enable CORS
app.use(cors());

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/blogs', require('./routes/blogRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));