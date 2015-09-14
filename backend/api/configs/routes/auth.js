var AuthController = require('../../controllers/AuthController.js');


module.exports = [
    {
        method: 'POST', path: '/auth/signin',
        config: { handler: AuthController.signin }
    }
];
