import styles from './Image.scss';
import React, { PropTypes } from 'react';

class Image extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <object className={styles.main} data={this.props.defaultSrc} type="image/png">
                <img src={this.props.src} />
            </object>
        )
    }
}

Image.defaultProps = {
    src: "",
    defaultSrc: ""
};

Image.propTypes = {
    src: PropTypes.string,
    defaultSrc: PropTypes.string
};

export default Image;
