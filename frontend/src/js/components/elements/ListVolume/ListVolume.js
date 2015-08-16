import React, { PropTypes } from 'react';
import List from '../List';
import ListItem from '../ListItem';

class ListVolume extends React.Component {
    render() {
        var commands = [];
        var canMove = false;
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

ListVolume.propTypes = {
    items: PropTypes.array
};

ListVolume.defaultProps = {
    items: []
};

export default ListVolume;
