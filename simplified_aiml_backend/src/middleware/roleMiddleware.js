module.exports = function requireRole(role) {
  return (req, res, next) => {
    const userRole = req.user && req.user.role;
    if (!userRole) return res.status(403).json({ message: 'Forbidden' });
    if (Array.isArray(role) ? role.includes(userRole) : userRole === role || userRole === 'admin') {
      return next();
    }
    return res.status(403).json({ message: 'Insufficient role' });
  };
};
