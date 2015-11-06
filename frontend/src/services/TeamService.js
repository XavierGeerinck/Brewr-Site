import request from 'superagent';


class TeamService {
  fetchTeams() {
    request
      .get('http://localhost:1337/organisations/1/projects')
      .set('Authorization', 'JWT ' + localStorage.getItem('jwt'))
      .accept('json')
      .end(function(err, res){
        console.log(err);
        var result = JSON.parse(res.text);
        callback(result);
      })
  }
}

export default new TeamService();
