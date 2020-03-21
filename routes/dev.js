'use strict';
const usernameGenerator = require('../services/username-generator');

module.exports = app => {

    app.get('/dev/generate-username', (req, res) => {
        usernameGenerator.create().then(username => res.send({ username }))
    });

};