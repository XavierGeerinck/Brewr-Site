import styles from './TabContainer.scss';
import React, { PropTypes } from 'react';
import cx from 'classnames';

class TabContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedItemIdx: 0
        };
    }

    handleTabChange(index) {
        this.setState({
            selectedItemIdx: index
        });
    }

    render() {
        var self = this;
        let children = this.props.children;
        const { selectedItemIdx } = this.state;

        // Filter out the null children
        children = children.filter(i => {
            return i !== null && i !== undefined;
        });

        return (
            <div className={styles.TabContainer}>
                {/* Show tabs if more than 1 item! */}
                {
                    children.length > 1 ?
                    <ul className={styles['TabContainer-Tabs']}>
                        {
                            children.map((i, index) => {
                                let key = "tab_container_" + index;
                                
                                let className = cx(
                                    selectedItemIdx === index ? styles['TabContainer-Tab-Selected'] : null
                                );

                                return i && i.props ? <li className={className} key={key} onClick={self.handleTabChange.bind(self, index)}>{i.props.text}</li> : null
                            })
                        }
                    </ul>
                    : null
                }

                {/* Render the children for the tab */}
                {
                    children.filter((i, index) => {
                        return selectedItemIdx === index
                    })
                }
            </div>
        )
    }
};

TabContainer.propTypes = {
};

TabContainer.defaultProps = {
};

export default TabContainer;
