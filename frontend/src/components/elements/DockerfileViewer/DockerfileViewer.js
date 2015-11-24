import styles from './DockerfileViewer.scss';
import React, { PropTypes } from 'react';

export default class DockerfileViewer extends React.Component {
    constructor (props) {
        super(props);

        // Temp hardcode
        //this.props.dockerFileObject = {"distribution":"ubuntu","distribution_version":"15.04","envInfo":{"maintainer":"Xavier","label":[{ "value": "com.brewr.io=value", "id": 0 }],"workdir":"/home/xavier","user":"root","run":[{"value":"sudo apt-get install nodejs","id":0},{"value":"sudo apt-get install nginx","id":1},{"value":"sudo apt-get install mariadb","id":2},{"value":"sudo apt-get install mongodb","id":3}],"cmd":[{"value":"nginx -g daemon off;"}],"expose":[{"value":"80:80","id":0},{"value":"3306:3306","id":1},{"value":"8000:8000","id":2}],"env":[{"value":"ENVIRONMENT=staging","id":0},{"value":"TEST=test123","id":1}],"add":[{"value":"config/nginx.conf /etc/nginx/nginx.conf","id":0},{"value":"log /var/log","id":1}],"copy":null,"entrypoint":null,"volume":[{"value":"/data","id":0},{"value":"/c/Users/thebi/logs:/var/logs","id":1}],"onbuild":null}};
    }
    render() {
        // TODO: Add CMD to start the install script
        console.log(this.props.dockerFileObject);
        return (
            <div className={styles['DockerfileViewer']}>
                <h1>JSON</h1>
                <div className={styles['DockerfileViewer-StartupScript']}>
                    { JSON.stringify(this.props.dockerFileObject) }
                </div>

                <h1>Docker Startup Command</h1>
                <div className={styles['DockerfileViewer-StartupParams']}>
                    docker run
                    <div dangerouslySetInnerHTML={{ __html: this.renderStartupPorts() }} />
                    <div dangerouslySetInnerHTML={{ __html: this.renderStartupVolumes() }} />
                </div>

                <h1>Dockerfile</h1>
                <div className={styles['DockerfileViewer-Dockerfile']}>
                    <div dangerouslySetInnerHTML={{ __html: this.renderDistribution() }} />
                    <div dangerouslySetInnerHTML={{ __html: this.renderMaintainer() }} />
                    <div dangerouslySetInnerHTML={{ __html: this.renderDockerLabels() }} />
                    <div dangerouslySetInnerHTML={{ __html: this.renderDockerUser() }} />
                    <div dangerouslySetInnerHTML={{ __html: this.renderCommands() }} />
                    <div dangerouslySetInnerHTML={{ __html: this.renderDockerVolumes() }} />
                    <div dangerouslySetInnerHTML={{ __html: this.renderAddFiles() }} />
                    <div dangerouslySetInnerHTML={{ __html: this.renderEnvironmentVars() }} />
                    <div dangerouslySetInnerHTML={{ __html: this.renderDockerWorkdir() }} />
                    <div dangerouslySetInnerHTML={{ __html: this.renderDockerCMD() }} />
                    <div dangerouslySetInnerHTML={{ __html: this.renderPortsDockerfile() }} />
                </div>

                <h1>Files to create</h1>
                <div className={styles['DockerfileViewer-StartupScript']}>
                    <div dangerouslySetInnerHTML={{ __html: this.renderCreateFiles() }} />
                </div>
            </div>
        )
    }

    /**
     * Renders the commands to use in the startup app.sh script
     */
    renderStartupScript() {
        const obj = this.props.dockerFileObject;

        if (!obj.envInfo.cmd) {
            return;
        }

        var lines = "#!/bin/bash<br />";

        obj.envInfo.cmd.forEach(cmd => {
            lines += cmd.value + "\n<br />";
        });

        return lines;
    }

    /**
     * Sets the CMD to app.sh
     */
    renderDockerCMD() {
        return "CMD [ \"app.sh\" ]";
    }

    renderDistribution() {
        const obj = this.props.dockerFileObject;

        if (!obj.distribution) {
            return;
        }

        var line = "FROM " + obj.distribution;

        if (obj.distributionVersion) {
            line += ":" + obj.distributionVersion;
        }

        return line;
    }

    renderMaintainer() {
        const obj = this.props.dockerFileObject;

        if (!obj.envInfo || !obj.envInfo.maintainer) {
            return;
        }

        var line = "MAINTAINER " + obj.envInfo.maintainer;

        return line;
    }

    renderCommands() {
        const obj = this.props.dockerFileObject;

        if (!obj.envInfo || !obj.envInfo.run) {
            return;
        }

        var lines = "";

        lines += "<br /># Running the install program commands<br />";
        obj.envInfo.run.forEach(r => {
            lines += "RUN " + r + "\n<br />";
        });

        lines += "<br /># Downloading the source code<br />";
        obj.envInfo.sourceCode.forEach(r => {
            lines += "RUN " + r + "\n<br />";
        });

        return lines;
    }

    /**
     * Adds metadata
     */
    renderDockerLabels() {
        const obj = this.props.dockerFileObject;

        if (!obj.envInfo || !obj.envInfo.label) {
            return;
        }

        var lines = "";

        lines += "<br /># Metadata settings<br />";
        obj.envInfo.label.forEach(l => {
            lines += "LABEL " + "\"" + l.split("=")[0] + "\"" + "=" + "\"" + l.split("=")[1] + "\"" + "<br />"
        });

        return lines;
    }

    /**
     * Sets the working directory for the commands
     */
    renderDockerWorkdir() {
        const obj = this.props.dockerFileObject;

        if (!obj.envInfo || !obj.envInfo.workdir) {
            return;
        }

        var line = "WORKDIR " + obj.envInfo.workdir;

        return line;
    }

    /**
     * Sets the user or UID to use when running the image and every RUN, CMD and ENTRYPOINT instruction
     */
    renderDockerUser() {
        const obj = this.props.dockerFileObject;

        if (!obj.envInfo || !obj.envInfo.user) {
            return;
        }

        var line = "USER " + obj.envInfo.user;

        return line;
    }

    /**
     * Shows the ports to be forwarded through the -p IP:host_port:container_port command
     */
    renderStartupPorts() {
        const obj = this.props.dockerFileObject;

        if (!obj.envInfo || !obj.envInfo.expose) {
            return;
        }

        var lines = "";

        obj.envInfo.expose.forEach(e => {
            lines += "-p " + e +" ";
        });

        return lines;
    }

    /**
     * Specify which directory we will bind on which volume (uses the -v parameter)
     */
    renderStartupVolumes() {
        const obj = this.props.dockerFileObject;

        if (!obj.envInfo || !obj.envInfo.volume) {
            return;
        }

        var lines = "";

        obj.envInfo.volume.forEach(v => {
            lines += "-v " + v +" ";
        });

        return lines;
    }

    /**
     * Renders with the EXPOSE <port> command
     * We can later say that we want to auto assign ports through docker run --publish-all=true
     */
    renderPortsDockerfile() {
        const obj = this.props.dockerFileObject;

        if (!obj.envInfo || !obj.envInfo.expose) {
            return;
        }

        var lines = "";

        // First map the ports correctly (so only the left port)
        lines += "<br /># Exposing the ports<br />";
        obj.envInfo.expose.map(e => {
            if (e.indexOf(":") > -1) return e.split(":")[e.split(":").length - 1];
            return e;
        }).forEach(r => {
            lines += "EXPOSE " + r + "\n<br />";
        });

        return lines;
    }

    /**
     * Renders the VOLUME command for docker, this specifies which directories
     * will container external data
     * Note: Since the -v parameter uses <hostpath>:<containerpath> we need to get the last element on : split
     */
    renderDockerVolumes() {
        const obj = this.props.dockerFileObject;

        if (!obj.envInfo || !obj.envInfo.volume) {
            return;
        }

        var lines = "";

        lines += "<br /># Synching directories<br />";
        lines += "VOLUME [ ";
        lines += obj.envInfo.volume.map(v => {
            if (v.indexOf(":") > -1) return "\"" + v.split(":")[v.split(":").length - 1] + "\"";
            return "\"" + v + "\"";
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

        if (!obj.envInfo || !obj.envInfo.add) {
            return;
        }

        var lines = "";

        lines += "<br /># Adding files<br />";
        obj.envInfo.add.forEach(v => {
            lines += "ADD " + v + "<br />";
        });

        return lines;
    }

    /**
     * Adds environment variables
     * ENV <key>=<value>
     */
    renderEnvironmentVars() {
        const obj = this.props.dockerFileObject;

        if (!obj.envInfo || !obj.envInfo.env) {
            return;
        }

        var lines = "";

        lines += "<br />#Environment variables<br />";
        obj.envInfo.env.forEach(e => {
            lines += "ENV " + e.split("=")[0] + " " + e.split("=")[1] + "<br />";
        });

        return lines;
    }

    /**
     * When we upload files the part content will be set in the add envInfo, these need to be files that have to be created
     */
     renderCreateFiles() {
         const obj = this.props.dockerFileObject;

         if (!obj.files) {
             return;
         }

         var lines = "";
         obj.files.forEach(v => {
             if (v.content) {
                 lines += "# File: " + v.name + "<br />" + v.content + "<br />";
             }
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
