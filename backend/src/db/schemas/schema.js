/**
 * This file contains the database layout, it has been abstracted so we got
 * a nice and simple overview of the database.
 */
var Schema = {
    user: {
        id: { type: 'increments', nullable: false, primary: true },
        email: { type: 'string', unique: true, nullable: false },
        password: { type: 'string', nullable: false },
        name: { type: 'string', nullable: false },
        first_name: { type: 'string', nullable: false },
        last_name: { type: 'string', nullable: false },
        avatar_url: { type: 'string', nullable: false, defaultTo: './avatar.png' },
        enabled: { type: 'boolean', nullable: false, defaultTo: true, comment: 'Is the account still active?' },
        scope: { type: 'string', nullable: false, defaultTo: 'user' },
        created_at: { type: 'dateTime', nullable: false },
        updated_at: { type: 'dateTime', nullable: true }
    },

    user_session: {
        id: { type: 'increments', nullable: false, primary: true },
        token: { type: 'string', unique: true, nullable: false },
        ip: { type: 'string', nullable: true },
        user_id: { references: 'id', inTable: 'user', type: 'integer', unsigend: true, nullable: false },
        user_agent: { type: 'text', nullable: true },
        created_at: { type: 'dateTime', nullable: false },
        updated_at: { type: 'dateTime', nullable: true }
    },

    organisation: {
        id: { type: 'increments', nullable: false, primary: true },
        uuid: { type: 'uuid', unique: true, nullable: false, comment: 'Unique identifier for the organisation, will be used client side' },
        name: { type: 'string', nullable: false },
        description: { type: 'string', nullable: true },
        logo: { type: 'string', nullable: true },
        subdomain: { type: 'string', nullable: true, comment: 'Holds the subdomain that a organisation can use to access its organisation' },
        active: { type: 'boolean', nullable: false, defaultTo: true, comment: 'Is the organisation still active?' },
        owner: { references: 'id', inTable: 'user', type: 'integer', nullable: false, unsigned: true, comment: 'Who owns this organisation?' },
        created_by: { references: 'id', inTable: 'user', type: 'integer', nullable: false, unsigned: true, comment: 'Who created the organisation originally?' },
        user_limit: { type: 'integer', nullable: false, defaultTo: 10, comment: 'Maximum users in the organisation' },
        project_limit: { type: 'integer', nullable: false, defaultTo: 10, comment: 'Maximum amount of projects for the organisation' },
        expiry_time: { type: 'dateTime', nullable: false, defaultTo: 'NOW()', comment: 'When do does the plan expire?' },
        created_at: { type: 'dateTime', nullable: false },
        updated_at: { type: 'dateTime', nullable: true },
        deleted_at: { type: 'dateTime', nullable: true },
    },

    project: {
        id: { type: 'increments', nullable: false, primary: true },
        name: { type: 'string', nullable: false },
        description: { type: 'text', nullable: true },
        image_url: { type: 'string', nullable: true },
        organisation_id: { references: 'id', inTable: 'organisation', type: 'integer', nullable: false },
        created_by: { references: 'id', inTable: 'user', type: 'integer', unsigned: true, nullable: false },
        owner: { references: 'id', inTable: 'user', type: 'integer', unsigned: true, nullable: false },
        archived: { type: 'boolean', nullable: false, defaultTo: false },
        created_at: { type: 'string', nullable: false },
        updated_at: { type: 'string', nullable: true }
    },

    team: {
        id: { type: 'increments', nullable: false, primary: true},
        name: {type: 'string', nullable: false},
        description: {type: 'text', nullable: true},
        image_url: { type: 'string', 'nullable': false},
        team_leader: {references: 'id', inTable: 'user', type: 'integer', nullable: true},
        created_at: { type: 'dateTime', nullable: false},
        organisation: {references: 'id', inTable: 'organisation', type: 'integer', nullable: true},
        created_by: {references: 'id', inTable: 'user', type: 'integer', nullable: true},
        updated_at: { type: 'dateTime', nullable: true},
        active: { type: 'boolean', defaultTo: true}
    },

    team_role: {
        id: { type: 'increments', nullable: false, primary: true },
        team_id: { references: 'id', inTable: 'team', type: 'integer', nullable: false, unsigned: true, comment: 'What team does the specified role belong to'},
        user_id: { references: 'id', inTable: 'user', type: 'integer', nullable: false, unsigned: true, comment: 'Which user has this role'},
        role: {type: 'string', nullable: false},
        created_at: { type: 'dateTime', nullable: false, comment: 'When was the role added'}
    },

    team_user: {
        id: { type: 'increments', nullable: false, primary: true },
        team_id: { compoundPrimaryKey: true, references: 'id', inTable: 'team', type: 'integer', nullable: false, unsigned: true },
        user_id: { compoundPrimaryKey: true, references: 'id', inTable: 'user', type: 'integer', nullable: false, unsigned: true },
        created_at: { type: 'dateTime', nullable: false, comment: 'When was the user added to the team?'}
    },

    project_team: {
        project_id: { compoundPrimaryKey: true, references: 'id', inTable: 'project', type: 'integer', nullable: false, unsigned: true },
        team_id: { compoundPrimaryKey: true, references: 'id', inTable: 'team', type: 'integer', nullable: false, unsigned: true },
        created_at: { type: 'dateTime', nullable: false }
    },

    project_role: {
        id: { type: 'increments', nullable: false, primary: true },
        project_id: { references: 'id', inTable: 'project', type: 'integer', nullable: false, unsigned: true, comment: 'What project does the specified role belong to'},
        user_id: { references: 'id', inTable: 'user', type: 'integer', nullable: false, unsigned: true, comment: 'Which user has this role'},
        role: {type: 'string', nullable: false},
        created_at: { type: 'dateTime', nullable: false, comment: 'When was the role added'}
    },

    project_revision: {
        id: { type: 'increments', nullable: false, primary: true },
        project: { references: 'id', inTable: 'project',  type: 'integer', unsigned: true, nullable: false },
        revision_number: { type: 'uuid', nullable: false },
        created_at: { type: 'dateTime', nullable: false },
        updated_at: { type: 'dateTime', nullable: true }
    },

    project_env_info: {
        id: { type: 'increments', nullable: false, primary: true },
        project_revision: { references: 'id', inTable: 'project_revision', type: 'integer', unsigned: true, nullable: false },
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
        startup_command: { type: 'text', nullable: true }
    },

    project_file: {
        id: { type: 'increments', nullable: false, primary: true },
        project_revision: { references: 'id', inTable: 'project_revision', type: 'integer', unsigned: true, nullable: false },
        added_by: { references: 'id', inTable: 'user', type: 'integer', unsigned: true, nullable: false, comment: 'Who added the file to this project?' },
        file_name: { type: 'string', nullable: false },
        file_date_uri: { type: 'text', nullable: false }
    },

    // Join tables
    organisation_user: {
        organisation_id: { compoundPrimaryKey: true, references: 'id', inTable: 'organisation', type: 'integer', nullable: false, unsigned: true },
        user_id: { compoundPrimaryKey: true, references: 'id', inTable: 'user', type: 'integer', nullable: false, unsigned: true },
        is_manager: { type: 'boolean', nullable: false, defaultTo: false, comment: 'Defines if the user is a manager of the organisation and if he/she can add people to projects, including managers' }
    },

    project_user: {
        project_id: { compoundPrimaryKey: true, references: 'id', inTable: 'project', type: 'integer', nullable: false, unsigned: true },
        user_id: { compoundPrimaryKey: true, references: 'id', inTable: 'user', type: 'integer', nullable: false, unsigned: true },
        is_manager: { type: 'boolean', nullable: false, defaultTo: false, comment: 'Defines if the user is a manager of the current project' },
        is_installed: { type: 'boolean', nullable: false, defaultTo: false, comment: 'Is the project installed?' },
        is_running: { type: 'boolean', nullable: false, defaultTo: false, comment: 'Is the project running?' },
    }
}

module.exports = Schema;
