import styles from './TextBox.scss';
import React, { PropTypes } from 'react';

class TextBox extends React.Component {
    render () {
        return (
            <div className={styles.TextBox}>
                {
                    this.props.maxLines > 1 ?
                    <textarea {...this.props} className={styles['TextBox-Input']} ref="input" key="input" rows={this.props.maxLines} /> :
                    <input {...this.props} className={styles['TextBox-Input']} ref="input" key="input" />
                }
            </div>
        );
    }
}
