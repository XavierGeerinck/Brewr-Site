/**
 * AuthController
 * @description handles the authentications
 */
var passport = require('passport');

function _onPassportAuth(req, res, err, user, info) {
    if (err) {
        console.log(err);
        return res.serverError(err);
    }

    if (!user) {
        return res.unauthorized(null, info && info.code, info && info.message);
    }

    return res.ok({
        token: AuthService.createToken(user),
        user: user
    });
}

module.exports = {
    signup: function (req, res) {
        User
        .create(_.omit(req.allParams(), 'id'))
        .then(function (user) {
            return {
                token: AuthService.createToken(user),
                user: user
            };
        })
        .then(res.created)
        .catch(res.serverError);
    },
    signin: function (req, res){
        passport.authenticate('local', _onPassportAuth.bind(this, req, res))(req, res);
    }
}
