import React, { PropTypes } from 'react';

export default class DockerfileViewer extends React.Component {
    constructor (props) {
        super(props);

        // Temp hardcode
        this.props.dockerFileObject = {"distribution":"ubuntu","distribution_version":"15.04","instructions":{"maintainer":"Xavier","label":[{ "value": "com.brewr.io=value", "id": 0 }],"workdir":"/home/xavier","user":"root","cmd":[{"value":"sudo apt-get install nodejs","id":0},{"value":"sudo apt-get install nginx","id":1},{"value":"sudo apt-get install mariadb","id":2},{"value":"sudo apt-get install mongodb","id":3}],"run":null,"expose":[{"value":"80:80","id":0},{"value":"3306:3306","id":1},{"value":"8000:8000","id":2}],"env":[{"value":"ENVIRONMENT=staging","id":0},{"value":"TEST=test123","id":1}],"add":[{"value":"config/nginx.conf /etc/nginx/nginx.conf","id":0},{"value":"log /var/log","id":1}],"copy":null,"entrypoint":null,"volume":[{"value":"/data","id":0},{"value":"/c/Users/thebi/logs:/var/logs","id":1}],"onbuild":null}};
    }
    render() {
        // TODO: Add CMD to start the install script
        console.log(this.props.dockerFileObject);
        return (
            <div className="DockerfileViewer">
                <h1>Docker Startup Command</h1>
                <div className="DockerfileViewer-StartupParams">
                    docker run
                    <div dangerouslySetInnerHTML={{ __html: this.renderStartupPorts() }} />
                    <div dangerouslySetInnerHTML={{ __html: this.renderStartupVolumes() }} />
                </div>

                <h1>Dockerfile</h1>
                <div className="DockerfileViewer-Dockerfile">
                    <div dangerouslySetInnerHTML={{ __html: this.renderDistribution() }} />
                    <div dangerouslySetInnerHTML={{ __html: this.renderMaintainer() }} />
                    <div dangerouslySetInnerHTML={{ __html: this.renderDockerLabels() }} />
                    <div dangerouslySetInnerHTML={{ __html: this.renderDockerWorkdir() }} />
                    <div dangerouslySetInnerHTML={{ __html: this.renderDockerUser() }} />
                    <div dangerouslySetInnerHTML={{ __html: this.renderCommands() }} />
                    <div dangerouslySetInnerHTML={{ __html: this.renderDockerVolumes() }} />
                    <div dangerouslySetInnerHTML={{ __html: this.renderAddFiles() }} />
                    <div dangerouslySetInnerHTML={{ __html: this.renderEnvironmentVars() }} />
                    <div dangerouslySetInnerHTML={{ __html: this.renderPortsDockerfile() }} />
                </div>
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

        return line;
    }

    renderCommands() {
        const obj = this.props.dockerFileObject;

        var lines = "";

        obj.instructions.cmd.forEach(cmd => {
            lines += "RUN " + cmd.value + "\n<br />";
        });

        return lines;
    }

    /**
     * Adds metadata
     */
    renderDockerLabels() {
        const obj = this.props.dockerFileObject;

        var lines = "";

        obj.instructions.label.forEach(l => {
            lines += "LABEL " + "\"" + l.value.split("=")[0] + "\"" + "=" + "\"" + l.value.split("=")[1] + "\"" + "<br />"
        });

        return lines;
    }

    /**
     * Sets the working directory for the commands
     */
    renderDockerWorkdir() {
        const obj = this.props.dockerFileObject;

        var line = "WORKDIR " + obj.instructions.workdir;

        return line;
    }

    /**
     * Sets the user or UID to use when running the image and every RUN, CMD and ENTRYPOINT instruction
     */
    renderDockerUser() {
        const obj = this.props.dockerFileObject;

        var line = "USER " + obj.instructions.user;

        return line;
    }

    /**
     * Shows the ports to be forwarded through the -p IP:host_port:container_port command
     */
    renderStartupPorts() {
        const obj = this.props.dockerFileObject;

        var lines = "";

        obj.instructions.expose.forEach(e => {
            lines += "-p " + e.value +" ";
        });

        return lines;
    }

    /**
     * Specify which directory we will bind on which volume (uses the -v parameter)
     */
    renderStartupVolumes() {
        const obj = this.props.dockerFileObject;

        var lines = "";

        obj.instructions.volume.forEach(v => {
            lines += "-v " + v.value +" ";
        });

        return lines;
    }

    /**
     * Renders with the EXPOSE <port> command
     * We can later say that we want to auto assign ports through docker run --publish-all=true
     */
    renderPortsDockerfile() {
        const obj = this.props.dockerFileObject;

        var lines = "EXPOSE [ ";

        lines += obj.instructions.expose.map(e => {
            if (e.value.indexOf(":") > -1) return e.value.split(":")[e.value.split(":").length - 1];
            return e.value;
        }).join(", ");

        lines += " ]";

        return lines;
    }

    /**
     * Renders the VOLUME command for docker, this specifies which directories
     * will container external data
     * Note: Since the -v parameter uses <hostpath>:<containerpath> we need to get the last element on : split
     */
    renderDockerVolumes() {
        const obj = this.props.dockerFileObject;

        var lines = "VOLUME [ ";

        lines += obj.instructions.volume.map(v => {
            if (v.value.indexOf(":") > -1) return "\"" + v.value.split(":")[v.value.split(":").length - 1] + "\"";
            return "\"" + v.value + "\"";
        }).join(", ");

        lines += " ]";

        return lines;
    }

    /**
     * Adds files such as configuration files
     * Uses the ADD command (ADD <SRC>... <DEST>)
     */
    renderAddFiles() {
        const obj = this.props.dockerFileObject;

        var lines = "";

        obj.instructions.add.forEach(v => {
            lines += "ADD " + v.value + "<br />";
        });

        return lines;
    }

    /**
     * Adds environment variables
     * ENV <key>=<value>
     */
    renderEnvironmentVars() {
        const obj = this.props.dockerFileObject;

        var lines = "";

        obj.instructions.env.forEach(e => {
            lines += "ENV " + e.value.split("=")[0] + " " + e.value.split("=")[1] + "<br />";
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
