/**
 * ProjectController
 *
 * @description :: Server-side logic for managing projects
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  assigned: function(req, res) {

    var user = req.user;
    ProjectUser
      .find({"user": user.id})
      .populate("project")
      .exec(function(err, assigned){
        res.json(assigned);
      });

  },

  allInOrganisation: function(req, res) {
    var organisation = req.param('organisation');
    var user = req.user;

    User.isMemberOf(user.id, organisation, function(isMember){

      if(!isMember) {
        return res.notFound();
      } else {
        Project
          .find({"organisation": organisation})
          .exec(function(err, projects){
            if(err) {
              console.log(err);
              return res.serverError();
            }
            return res.json(projects);
          });
      }
    });

  },

  assign: function(req, res) {

    var assigneeId = req.user.id;
    var userId = req.body.user;
    var projectId = req.param('project');

    User.assign(assigneeId, userId, projectId, function(succeeded, code){
      if(succeeded) {
        res.json({"success": true});
      } else {
        //TODO: add status codes
        res.json({"success": false});
      }
    });
  }

};
