import jwt from 'jsonwebtoken';

const checkToken = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    res.status(401).json({ error: 'Not authorized' });
    return;
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET ?? 'easy_secret');
    next();
  } catch (e) {
    res.status(403).json({ error: 'Invalid token' });
  }
};

export default checkToken;
