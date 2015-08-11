import React, { PropTypes } from 'react';
import styles from './InlineContainer.css';
import WithStyles from '../../decorators/withStyles';

@WithStyles(styles)
class InlineContainer {
  render() {
    return <div className="Inline-Container">{this.props.children}</div>;
  }
}

export default InlineContainer;
