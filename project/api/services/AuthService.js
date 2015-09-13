/**
 * Created by Maxim on 14/08/2015.
 */
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

module.exports = {
    secret: sails.config.jwtSettings.secret,
    issuer: sails.config.jwtSettings.issuer,
    audience: sails.config.jwtSettings.audience,

    hashPassword: function(user) {
        if (user.password) {
            user.password = bcrypt.hashSync(user.password);
            return;
        }

        console.log("No password given");
    },

    comparePassword: function(password, user) {
        return bcrypt.compareSync(password, user.password);
    },
    createToken: function(user) {
        return jwt.sign({
            user: user.toJSON()
        },
        sails.config.jwtSettings.secret,
        {
            algorithm: sails.config.jwtSettings.algorithm,
            expiresInMinutes: sails.config.jwtSettings.expiresInMinutes,
            //issuer: sails.config.jwtSettings.issuer,
            //audience: sails.config.jwtSettings.audience
        })
    }
}
