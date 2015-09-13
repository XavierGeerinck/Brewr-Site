var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    JwtStrategy = require('passport-jwt').Strategy;

var tokenSecret = process.env.tokenSecret || 'TqSn6Y@Pr@3TFq*f6_7&f@*+V!$766hnfcY#Njz=A=K-_yhF_PjPJAYLxBCK%_As';

var EXPIRES_IN_MINUTES = 60*24,
    SECRET = tokenSecret,
    ISSUER = 'localhost',//TODO: change to brewr.io
    AUDIENCE = 'localhost',//TODO: change to brewr.io
    ALGORITHM = 'HS256';

var CONFIG_LOCAL_STRATEGY = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: false
};

var CONFIG_JWT_STRATEGY = {
    secretOrKey: SECRET,
    //issuer: 'brewr.io',
    //audience: 'audience',
    passReqToCallback: false
};

function _onLocalStrategyAuth(email, password, next) {

    User.findOne({ email: email}).exec(function(err, user) {

        if (err) {
            return next(err, false, {});
        }

        // user not found
        if (!user) {
            return next(null, false, { cpde: 'E_USER_NOT_FOUND', message: 'Unknown user ' + email });
        }

        // wrong password
        if (!AuthService.comparePassword(password, user)) {
            return next(null, false, { code: 'E_WRONG_PASSWORD', message: 'Invalid password' });
        }

        return next(null, user, {});
    });
}

function _onJwtStrategyAuth(payload, next) {
    var user = payload.user;
    return next(null, user, {});
}

passport.use(new LocalStrategy(CONFIG_LOCAL_STRATEGY, _onLocalStrategyAuth));
passport.use(new JwtStrategy(CONFIG_JWT_STRATEGY, _onJwtStrategyAuth));

module.exports.jwtSettings = {
    expiresInMinutes: EXPIRES_IN_MINUTES,
    secret: SECRET,
    algorithm: ALGORITHM,
    //issuer: ISSUER,
    //audience: AUDIENCE
};
