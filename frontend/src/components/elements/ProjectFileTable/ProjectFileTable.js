import React, { PropTypes } from 'react';
import BaseComponent from '../../BaseComponent';

export default class ProjectFileTable extends BaseComponent {

  //TODO: make project revision table component

  constructor() {
    super();
  }

  render() {

    const { files } = this.props;

    return (
      <table>
        <tbody>
        <tr>
          { files.map(r => {
            /*return (
              <tr>
                <td>{r.revision_number}</td>
                <td>{r.created_at}</td>
              </tr>
            );*/
          })}
        </tr>
        </tbody>
      </table>
    )
  }
}
