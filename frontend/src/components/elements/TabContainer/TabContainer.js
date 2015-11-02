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
                {
                    children.length > 1 ?
                    <ul className={styles['TabContainer-Tabs']}>
                        {
                            children.map((i, index) => {
                                let className = cx(
                                    selectedItemIdx === index ? styles['TabContainer-Tab-Selected'] : null 
                                );

                                return i && i.props ? <li className={className} onClick={self.handleTabChange.bind(self, index)}><a href="#">{i.props.text}</a></li> : null
                            })
                        }
                    </ul>
                    : <h1>{children[0].props.text}</h1>
                }

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
