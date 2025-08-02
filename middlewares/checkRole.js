const checkRole = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return res
      .status(403)
      .json({ error: "Access denied: insufficient permissions" });
  }
  next();
};

module.exports = { checkRole };
