import React from 'react';
import styles from "./FlexContainer.scss";

export default class FlexContainer  extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.FlexContainer}>
                {this.props.children}
            </div>
        )
    }
}
