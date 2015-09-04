import * as DockerHubConstants from '../constants/DockerHubConstants';
import DockerHubActions from '../actions/DockerHubActions';
import request from 'reqwest';
import when from 'when';

// https://registry.hub.docker.com/v1/search?q=ubu&page=1

class DockerHubService {
    fetchRepositories(searchTerm, page=1) {
        return when(request({
            url: DockerHubConstants.API_URL_SEARCH,
            method: 'GET',
            crossOrigin: true,
            type: 'json',
            data: {
                q: searchTerm,
                page: page
            }
        }))
        .then(function(response) {
            console.log(response);

            DockerHubActions.setRepositories(response.results);

            return true;
        });
    }
}

export default new DockerHubService();
