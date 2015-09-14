/**
* Project.js
*
* @description :: Represents a project
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
    identity: 'projectEnvInfo',
    tableName: 'project_env_info',
    attributes: {
        id: {
            type: 'integer',
            unique: true,
            primaryKey: true,
            columnName: 'id',
            autoIncrement: true
        },
        distribution: 'string',
        distributionVersion: {
            type: 'string',
            columnName: 'distribution_version'
        },
        maintainer: 'string',
        label: 'string',
        workdir: 'string',
        user: 'string',
        cmd: 'string',
        sourceCode: {
            type: 'string',
            columnName: 'source_code'
        },
        run: 'string',
        expose: 'string',
        env: 'string',
        add: 'string',
        copy: 'string',
        entrypoint: 'string',
        volume: 'string',
        onbuild: 'string',
        startupFileContent: {
            type: 'text',
            columnName: 'startup_file_content'
        },
        startupCommand: {
            type: 'string',
            columnName: 'startup_command'
        },

        //assocations
        projectRevision: {
            model: 'projectRevision'
        }
    }
};
