import styles from './Builder.scss';
import React, { PropTypes } from 'react';
import cx from 'classnames';
import AuthStore from '../../../stores/AuthStore';
import BuilderComponent from '../../elements/Builder';
import BuilderActions from '../../../actions/BuilderActions';

class Builder extends React.Component {
    constructor(props) {
        super(props);

		// Environment info
		this._params = {
			meta: {
				name: "Nginx",              // Project Name
				description: ""             // Project Description
			},
			files: [],                      // Files to add, format: { name: "", content: "" }
			envInfo: {
				"distribution": "ubuntu",
				"distributionVersion": "14.04",
				"maintainer": "Xavier",
				"label": [
					"com.brewr.io=somevalue",
				],
				"workdir": "/var/www",
				"user": "www-data",
				"run": [
					"sudo apt-get install nginx"
				],
				"sourceCode": null,
				"cmd": [
					"nginx -g daemon off;"
				],
				"expose": [
					"80:80",
					"443:443"
				],
				"env": [
					"ENVIRONMENT=staging"
				],
				"add": [
					"/etc/nginx/sites-available/default.conf:/etc/nginx/sites-available/brewr.io.conf",
				],
				"copy": null,
				"entrypoint": null,
				"volume": [
					"/var/www",
					"/var/log"
				],
				"onbuild": null
			}
		};
    }

    _handleOnClickFinish(image) {
        BuilderActions.saveProject(AuthStore.token, AuthStore.selected_organisation.uuid, image);
    }

    render() {
        var self = this;

        return (
            <div className="Builder">
				<BuilderComponent
					baseInfo={this._params}
					onClickFinish={this._handleOnClickFinish.bind(self)} />
            </div>
        );
    }
};

Builder.propTypes = {

};

Builder.defaultProps = {

};

export default Builder;
