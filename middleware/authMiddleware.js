const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.token || req.headers.authorization?.split(" ")[1];
  console.log(token, "token")
  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      _id: decoded.id,
      name: decoded?.username || "N/A",
      email: decoded.email
    } 
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = auth;
