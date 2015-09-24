# Backend code
## Code Practices
1. Only return reply at the last .then or in the .catch, else use return Promise.reject and return Promise.resolve
2. Never require bookshelf unless it's the db initializer! always use our middleware file in `src/db/index.js`

## install
Run database install:
- knex migrate:latest
- knex seed:run (for seed file)