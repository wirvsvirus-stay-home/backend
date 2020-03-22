'use strict';
const db = require('../models');
const { internalServerError } = require('../utils/http');

module.exports = app => {

    app.get('/leaders', function (req, res) {
        // Benutzer laden
        db['user'].findAll({
            attributes: ['username', 'rank', 'score', 'country'],
            order: [
                [ 'rank', 'DESC' ],
                [ 'score', 'DESC' ]
            ],
            limit: 10
        })

            // Benutzer zurückgeben
            .then(users => res.json({content: users}))

            // Error-Handling
            .catch(reason => internalServerError(res, reason))
    });

};

