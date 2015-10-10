# Backend code
## Validate roles
the validation function is going to assign roles dynamically based on the organisation and the project a user has access too.
We do this because this makes it easier to protect the routes.

Here are the roles that we can use:
* belongs-to-organisation-{organisation_id}-user
* belongs-to-organisation-{organisation_id}-creator
* belongs-to-organisation-{organisation_id}-project-{project_id}-user
* belongs-to-organisation-{organisation_id}-project-{project_id}-manager
* belongs-to-organisation-{organisation_id}-project-{project_id}-creator

All the underlying roles will be assigned, so for example if you are a creator of an organisation, then you will get the user, manager and creator role.

> The manager role for an organisation does not exist, this however would be a good idea for further implementations. Bigger companies tend to have people that get access to all the projects and can also manage those.

## Running the seeds
1. Install knex globally: `npm install knex -g`
2. Run: `knex migrate:rollback; knex migrate:latest; knex seed:run`

## Code Practices
1. Only return reply at the last .then or in the .catch, else use return Promise.reject and return Promise.resolve
2. Never require bookshelf unless it's the db initializer! always use our middleware file in `src/db/index.js`

## FAQ
1. The tests keep failing because of some FK or PK constraints
- Try to increase the timeout (it is on 4000ms now)
2. Run tests on a specified directory?
- Execute: `npm test -- <DIR>` with <DIR> being the dir from the root to the test, so for example: `npm test -- ./test/unit/services/project.js`
3. Can I view the routes somewhere?
- Go to http://127.0.0.1/docs to view them, this will only work on development
