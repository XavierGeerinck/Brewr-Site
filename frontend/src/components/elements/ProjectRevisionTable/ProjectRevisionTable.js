import React, { PropTypes } from 'react';
import BaseComponent from '../../BaseComponent';

export default class ProjectRevisionTable extends BaseComponent {

  //TODO: make project revision table component

  constructor() {
    super();
  }

  render() {

    const { revisions } = this.props;

    return (
      <table>
        <tbody>
          { revisions.map(r => {
            return (
              <tr key={r.id}>
                <td>{r.revision_number}</td>
                <td>{r.created_at}</td>
                <td></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    )
  }
}
