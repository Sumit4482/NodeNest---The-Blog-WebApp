


const isAdminMiddleware = (req, res, next) => {
    if (!req.user || !req.user.isAdmin) {
        return res.status(403).json({ message: 'Forbidden: You do not have permission to access this resource' });
    }
    next();
};

module.exports = isAdminMiddleware;
