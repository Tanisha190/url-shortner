const jwt = require('jsonwebtoken');

function verifyJwt(req, res, next) {
  try {
    const authHeader = req.headers.authorization || '';
    const [scheme, token] = authHeader.split(' ');

    if (scheme !== 'Bearer' || !token) {
      return res
        .status(401)
        .json({ message: 'Authorization token missing or invalid format' });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET 
    );

    req.user = {
      id: decoded.userId,
      email: decoded.email,
    };

    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

module.exports = verifyJwt;
