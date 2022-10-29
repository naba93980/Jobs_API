const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { UnauthorizationError } = require('../errors')

const authorizationMiddleware = async (req, res, next) => {
    // check header 
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizationError('Authorization invalid');
    }
    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        // attach the user to the job routes
        req.user = { userId: payload.userId, name: payload.name };
        next();
    } catch (err) {
        throw new UnauthorizationError('Authorization invalid ....token could not be verified');
    }
}

module.exports = authorizationMiddleware;