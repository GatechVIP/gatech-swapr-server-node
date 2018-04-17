const getDockerSecret = require('get-docker-secret');

// getDockerSecret(env, default) does the following:
// 1. Looks for an environment variable called "{env}_FILE". Return the contents of the file if the var exists.
// 2. Looks for an environment variable called "{env}". Returns the value if it exists.
// 3. Returns the default.

module.exports = {
    development: {
        username: getDockerSecret('DB_USERNAME', null),
        password: getDockerSecret('DB_PASSWORD', null),
        database: getDockerSecret('DB_NAME', null),
        host: 'db',
        dialect: 'postgresql',
        logging: false
    },
    production: {
        username: getDockerSecret('DB_USERNAME', null),
        password: getDockerSecret('DB_PASSWORD', null),
        database: getDockerSecret('DB_NAME', null),
        host: 'db',
        dialect: 'postgresql',
        logging: false
    },
    test: {
        username: getDockerSecret('DB_USERNAME', null),
        password: getDockerSecret('DB_PASSWORD', null),
        // database: getDockerSecret('DB_NAME', null),
        database: 'swapr_test',
        host: 'test-db',
        dialect: 'postgresql',
        logging: false
    }
};
