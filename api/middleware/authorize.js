const auth = require('basic-auth');
const bcrypt = require('bcryptjs');
const { User } = require('../models');

// Middleware function for authenticating a user by their first name and email address
exports.authenticateUser = async (req, res, next) => {
    let message;
    const credentials = auth(req);
    
     if (credentials) {
        const user = await User.findOne({ where: {email: credentials.name} });
        if (user) {
            const authenticated = bcrypt.compareSync(credentials.pass, user.passwordHash);

            if (authenticated) {
                console.log(`Authentication successful for: ${user.email}`);

                req.currentUser = user;
            } else {
                message = `Authentication failure for: ${user.email}`;
            }
        } else {
            message = `User not found for email: ${credentials.name}`;
        }
     } else {
        message = 'Auth header not found';
     }

     if (message) {
       console.warn(message);
       res.status(401).json({ message: "Access Denied" });
     } else {
       next();
     }
}