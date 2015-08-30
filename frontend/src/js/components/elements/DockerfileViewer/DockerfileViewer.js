import React, { PropTypes } from 'react';

export default class DockerfileViewer extends React.Component {
    constructor (props) {
        super(props);

        // Temp hardcode
        this.props.dockerFileObject = {"distribution":"ubuntu","distribution_version":"15.04","instructions":{"maintainer":"Xavier","label":"labelentered","workdir":"/home/xavier","user":"root","cmd":[{"value":"sudo apt-get install nodejs","id":0},{"value":"sudo apt-get install nginx","id":1},{"value":"sudo apt-get install mariadb","id":2},{"value":"sudo apt-get install mongodb","id":3}],"run":null,"expose":[{"value":"80:80","id":0},{"value":"3306:3306","id":1},{"value":"8000:8000","id":2}],"env":[{"value":"ENVIRONMENT=staging","id":0},{"value":"TEST=test123","id":1}],"add":[{"value":"/var/www:www","id":0},{"value":"/var/log:log","id":1}],"copy":null,"entrypoint":null,"volume":[{"value":"/data","id":0},{"value":"/logs","id":1}],"onbuild":null}};
    }
    render() {
        console.log(this.props.dockerFileObject);
        return (
            <div className="DockerfileViewer">
                <div dangerouslySetInnerHTML={{ __html: this.renderDistribution() }} />
                <div dangerouslySetInnerHTML={{ __html: this.renderMaintainer() }} />
                <div dangerouslySetInnerHTML={{ __html: this.renderCommands() }} />
            </div>
        )
    }

    renderDistribution() {
        const obj = this.props.dockerFileObject;

        var line = "FROM " + obj.distribution;

        if (obj.distribution_version) {
            line += ":" + obj.distribution_version;
        }

        return (line);
    }

    renderMaintainer() {
        const obj = this.props.dockerFileObject;

        var line = "MAINTAINER " + obj.instructions.maintainer;

        return (line);
    }

    renderCommands() {
        const obj = this.props.dockerFileObject;

        var lines = "";

        obj.instructions.cmd.forEach(cmd => {
            lines += "RUN " + cmd.value + "\n<br />";
        });

        return lines;
    }
};

DockerfileViewer.propTypes = {
    dockerFileObject: PropTypes.object
};

DockerfileViewer.defaultProps = {
    dockerFileObject: {}
};
