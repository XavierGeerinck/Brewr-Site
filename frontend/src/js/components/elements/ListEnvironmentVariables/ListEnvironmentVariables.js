import React, { PropTypes } from 'react';
import List from '../List';
import ListItem from '../ListItem';

class ListEnvironmentVariables extends React.Component {
    render() {
        var commands = [];
        var canMove = true;
        var canRemove = true;

        this.props.items.forEach(function (item) {
            commands.push(<ListItem value={item} canMove={canMove} canRemove={canRemove} />);
        });

        return (
            <div>
                <List>
                    {commands}
                </List>
            </div>
        );
    }
};

ListEnvironmentVariables.propTypes = {
    items: PropTypes.array
};

ListEnvironmentVariables.defaultProps = {
    items: []
};

export default ListEnvironmentVariables;
