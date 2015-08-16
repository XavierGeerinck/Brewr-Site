import React, { PropTypes } from 'react';

class DockerHubSearch extends React.Component {
    render() {
        return (
            <div className="DockerHubSearch">
                <input type="text" placeholder="Type a keyword..." />
            </div>
        );
    }
};

export default DockerHubSearch;
