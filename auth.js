module.exports = function auth(req, res, next) {
  const token = req.headers['x-api-key'] || req.query.api_key;
  const expected = process.env.WRITE_API_KEY || 'changeme';
  if (req.method === 'GET' || req.path === '/health') return next();
  if (!token || token !== expected) return res.status(401).json({ error: 'Unauthorized' });
  next();
};
