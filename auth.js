// middleware/auth.js
const jwt = require("jsonwebtoken");

module.exports = (requiredPermissions) => (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);

    req.user = user;
    
    const hasPermission = requiredPermissions.every(permission => 
      user.permissions.includes(permission)
    );

    if (!hasPermission) return res.status(403).json({ message: "Forbidden" });

    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

