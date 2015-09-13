/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    all: function (req, res) {
        User.find({}, function (err, users){
           res.json(users);
        });
    }
};
