// Try to use real User model, fallback to mock if MongoDB is not available
let User;
let useMock = false;
try {
  User = require('../models/User');
  console.log('Using real MongoDB User model');
} catch (error) {
  console.log('MongoDB User model not available, using mock User model');
  User = require('../models/MockUser');
  useMock = true;
}

const { generateToken } = require('../config/jwt');
const Joi = require('joi');

// Validation schemas
const registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  firstName: Joi.string().max(50).optional(),
  lastName: Joi.string().max(50).optional()
});

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    // Validate request body
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { username, email, password, firstName, lastName } = req.body;

    // Check if user already exists
    let userExists = null;
    try {
      userExists = await User.findOne({
        $or: [{ email }, { username }]
      });
    } catch (dbError) {
      // If using mock, we handle this differently
      if (useMock) {
        console.log('Using mock database for user lookup');
      } else {
        throw dbError;
      }
    }

    if (userExists) {
      return res.status(400).json({ error: 'User already exists with this email or username' });
    }

    // Create user
    const user = await User.create({
      username,
      email,
      password,
      firstName,
      lastName
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        token: generateToken({ id: user._id })
      });
    } else {
      res.status(400).json({ error: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    // Validate request body
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { email, password } = req.body;

    // Check for user email
    let user = null;
    try {
      user = await User.findOne({ email });
    } catch (dbError) {
      // If using mock, we handle this differently
      if (useMock) {
        console.log('Using mock database for user lookup');
      } else {
        throw dbError;
      }
    }

    // If we're using mock and didn't find user, try again with mock
    if (useMock && !user) {
      const UserModel = require('../models/MockUser');
      user = await UserModel.findOne({ email });
    }

    if (user && (await user.comparePassword(password))) {
      // Update last login (skip for mock)
      if (!useMock) {
        user.lastLogin = new Date();
        await user.save();
      }

      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        token: generateToken({ id: user._id })
      });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    let user = null;
    try {
      user = await User.findById(req.user._id);
    } catch (dbError) {
      // If using mock, we handle this differently
      if (useMock) {
        console.log('Using mock database for user lookup');
      } else {
        throw dbError;
      }
    }

    // If we're using mock and didn't find user, try again with mock
    if (useMock && !user) {
      const UserModel = require('../models/MockUser');
      user = await UserModel.findById(req.user._id);
    }

    if (user) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        createdAt: user.createdAt
      });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile
};