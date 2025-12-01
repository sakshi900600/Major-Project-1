const bcrypt = require('bcrypt');
const User = require('../models/User');
const { signAccessToken, signRefreshToken, verifyToken } = require('../utils/token');
const { registerSchema, loginSchema } = require('../validations/authValidators');


const register = async (req, res, next) => {
  try {
    // Validate request body
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { name, email, password } = req.body;

    // Check if email already exists
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: 'Email already registered' });

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password_hash, role: 'learner' });

    res.status(201).json({
      message: 'registered',
      user: { id: user._id, email: user.email, name: user.name }
    });

  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    // Validate request body
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !user.password_hash)
      return res.status(401).json({ message: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

    const payload = {
      sub: user._id.toString(),
      role: user.role,
      email: user.email
    };

    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken({ sub: user._id.toString() });

    // Save refresh token in DB (simple non-hashed approach)
    user.refreshTokens = [...(user.refreshTokens || []), refreshToken];
    await user.save();

    // Store refresh token in httpOnly cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({
      accessToken,
      user: { id: user._id, email: user.email, name: user.name, role: user.role }
    });

  } catch (err) {
    next(err);
  }
};

const refresh = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken || req.body.refreshToken;
    if (!token) return res.status(401).json({ message: 'No refresh token' });

    let decoded;
    try {
      decoded = verifyToken(token);
    } catch (e) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }

    const userId = decoded.sub;
    const user = await User.findById(userId);
    if (!user) return res.status(401).json({ message: 'User not found' });

    if (!user.refreshTokens || !user.refreshTokens.includes(token)) {
      return res.status(401).json({ message: 'Refresh token revoked' });
    }

    const payload = {
      sub: user._id.toString(),
      role: user.role,
      email: user.email
    };

    const newAccess = signAccessToken(payload);

    res.json({
      accessToken: newAccess,
      user: { id: user._id, email: user.email, role: user.role }
    });

  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken || req.body.refreshToken;

    if (token) {
      try {
        const decoded = verifyToken(token);
        const user = await User.findById(decoded.sub);

        if (user) {
          user.refreshTokens = (user.refreshTokens || []).filter(t => t !== token);
          await user.save();
        }
      } catch (e) {
        // ignore invalid tokens
      }
    }

    res.clearCookie('refreshToken');
    res.json({ message: 'logged out' });

  } catch (err) {
    next(err);
  }
};

module.exports = { register, login, refresh, logout };
