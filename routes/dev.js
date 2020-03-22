'use strict';
const usernameGenerator = require('../utils/username');

module.exports = app => {

    app.get('/dev/generate-username', (req, res) => {
        usernameGenerator.create().then(username => res.send({ username }))
    });

};