import jwt from 'jsonwebtoken'
// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Extract Bearer token

  if (!token) {
    return res.status(401).json({ error: "⛔ Unauthorized: Token is missing" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "⛔ Forbidden: Invalid token" });
    }
    req.user = user; // Attach the user object to the request
    next();
  });
};

// Middleware to check admin privileges
const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ error: "⛔ Forbidden: Admin access required" });
  }
  next();
};

export { authenticateToken, requireAdmin };
