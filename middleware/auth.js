module.exports = function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    const VALID_TOKEN = process.env.API_AUTH_TOKEN;

    if (!token) {
        return res.status(401).json({ error: 'Missing token' });
    }

    if (token !== VALID_TOKEN) {
        return res.status(403).json({ error: 'Invalid token' });
    }

    next();
};