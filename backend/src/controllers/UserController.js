/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    all: function (request, reply) {
        var User = request.server.plugins.dogwater.user;
        
        User.find({}, function (err, users){
           res.json(users);
        });
    },

    showLogged: function(request, reply) {
        return reply(request.auth.credentials.user);
    }
};
