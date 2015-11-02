import React, { PropTypes } from 'react';
import DockerHubService from '../../../services/DockerHubService';
import './DockerHubSearch.scss';

export default class DockerHubSearch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            repositories: []
        };
    }

    handleChange(e) {
        console.log(e.target.value);
        DockerHubService.fetchRepositories(e.target.value)
        .catch(function(err) {
            console.log('error fetching repositories');
        });
    }

    render() {
        return (
            <div className="DockerHubSearch">
                <input type="text" placeholder="Type a keyword..." onChange={this.handleChange.bind(this)}/>
            </div>
        );
    }
};
