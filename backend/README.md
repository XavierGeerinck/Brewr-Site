# Backend code
## Running the seeds
1. Install knex globally: `npm install knex -g`
2. Run: `knex migrate:rollback; knex migrate:latest; knex seed:run`

## Code Practices
1. Only return reply at the last .then or in the .catch, else use return Promise.reject and return Promise.resolve
2. Never require bookshelf unless it's the db initializer! always use our middleware file in `src/db/index.js`
