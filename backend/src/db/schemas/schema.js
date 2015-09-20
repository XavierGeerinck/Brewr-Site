/**
 * This file contains the database layout, it has been abstracted so we got
 * a nice and simple overview of the database.
 */
var Schema = {
    organisation: {
        id: { type: 'increments', nullable: false, primary: true },
        name: { type: 'string', nullable: false },
        description: { type: 'string', nullable: true },
        logo: { type: 'string', nullable: true },
        subdomain: { type: 'string', nullable: true, comment: 'Holds the subdomain that a organisation can use to access its organisation' },
        active: { type: 'boolean', nullable: false, defaultTo: true, comment: 'Is the organisation still active?' },
        owner: { type: 'integer', nullable: false, comment: 'Who owns this organisation?' },
        created_by: { type: 'integer', nullable: false, comment: 'Who created the organisation originally?' },
        user_limit: { type: 'integer', nullable: false, defaultTo: 10, comment: 'Maximum users in the organisation' },
        project_limit: { type: 'integer', nullable: false, defaultTo: 10, comment: 'Maximum amount of projects for the organisation' },
        expiry_time: { type: 'integer', nullable: false, comment: 'When do does the plan expire?' },
        created_at: { type: 'dateTime', nullable: false },
        updated_at: { type: 'dateTime', nullable: true },
        deleted_at: { type: 'dateTime', nullable: true },
    },

    project: {
        id: { type: 'increments', nullable: false, primary: true },
        name: { type: 'string', nullable: false },
        description: { type: 'string', nullable: true },
        image_url: { type: 'string', nullable: true },
        organisation: { type: 'integer', nullable: false },
        created_by: { type: 'integer', nullable: false },
        archived: { type: 'boolean', nullable: false, defaultsTo: false },
        created_at: { type: 'string', nullable: false },
        updated_at: { type: 'string', nullable: true }
    },

    project_env_info: {
        id: { type: 'increments', nullable: false, primary: true },
        distribution: { type: 'text', nullable: true },
        maintainer: { type: 'string', nullable: true },
        label: { type: 'text', nullable: true },
        workdir: { type: 'text', nullable: true },
        user: { type: 'string', nullable: true },
        cmd: { type: 'text', nullable: true },
        run: { type: 'text', nullable: true },
        expose: { type: 'text', nullable: true },
        env: { type: 'text', nullable: true },
        add: { type: 'text', nullable: true },
        copy: { type: 'text', nullable: true },
        entrypoint: { type: 'text', nullable: true },
        volume: { type: 'text', nullable: true },
        onbuild: { type: 'text', nullable: true },
        distribution_version: { type: 'string', nullable: true },
        source_code: { type: 'text', nullable: true },
        startup_file_content: { type: 'text', nullable: true },
        startup_command: { type: 'text', nullable: true },
        project_revision: { type: 'integer', nullable: false }
    },

    project_revision: {
        id: { type: 'increments', nullable: false, primary: true },
        project_id: { type: 'integer', nullable: false },
        revision_number: { type: 'uuid', nullable: false },
        created_at: { type: 'dateTime', nullable: false },
        updated_at: { type: 'dateTime', nullable: true }
    },

    project_file: {
        id: { type: 'increments', nullable: false, primary: true },
        file_name: { type: 'string', nullable: false },
        file_date_uri: { type: 'text', nullable: false }
    },

    user: {
        id: { type: 'increments', nullable: false, primary: true },
        email: { type: 'string', nullable: false },
        password: { type: 'string', nullable: false },
        name: { type: 'string', nullable: false },
        first_name: { type: 'string', nullable: false },
        last_name: { type: 'string', nullable: false },
        avatar_url: { type: 'string', nullable: false, defaultsTo: './avatar.png' },
        enabled: { type: 'boolean', nullable: false, defaultsTo: true, comment: 'Is the account still active?' },
        scope: { type: 'string', nullable: false, defaultsTo: 'user' },
        created_at: { type: 'dateTime', nullable: false },
        updated_at: { type: 'dateTime', nullable: true }
    },

    user_session: {
        id: { type: 'increments', nullable: false, primary: true },
        token: { type: 'string', nullable: false },
        ip: { type: 'string', nullable: true },
        user: { type: 'string', nullable: false },
        user_agent: { type: 'text', nullable: true },
        created_at: { type: 'dateTime', nullable: false },
        updated_at: { type: 'dateTime', nullable: true }
    }
}

module.exports = Schema;
