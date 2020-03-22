const R = require('ramda');
const db = require('../models');
const { internalServerError, notFound } = require('../utils/http');
const { create: createUsername } = require('../utils/username.js');

module.exports = app => {

    app.post('/users', (req, res) => {
        // Username erstellen
        createUsername()

            // Benutzer erstellen
            .then(username  => {
                return db['user'].create({
                    deviceId: req.body.deviceId,
                    username: username,
                    country: req.body.country,
                    latitude: req.body.latitude,
                    longitude: req.body.longitude,
                    radius: req.body.radius
                })
            })

            // Benutzer laden
            .then(({ id }) => db['user'].findByPk(id))

            // Benutzer zurückgeben
            .then(user => res.status(201).send({
                status: 201,
                message: "Created",
                user
            }))

            // Error-Handling
            .catch(reason => internalServerError(res, reason));
    });

    app.get('/users/:id', function (req, res) {
        // Benutzer laden
        db['user'].findByPk(req.params.id)

            // Benutzer zurückgeben
            .then(user => {
                if (user === null) {
                    notFound(res);
                } else {
                    res.json(user)
                }
            })

            // Errorhandling
            .catch(reason => internalServerError(res, reason))
    });

    app.put('/users/:id', async (req, res) => {
        // Benutzer laden
        const user = await db['user'].findByPk(req.params.id);

        // Pruefen ob Benutzer existiert
        if (user === null) {
            notFound(res);
            return
        }

        // ggf. Request in User setzen
        const { score, rank, baseStatus } = req.body;
        if (score !== undefined) {
            user.score = score
        }
        if (rank !== undefined) {
            user.rank = rank
        }
        if (baseStatus !== undefined) {
            user.rank = baseStatus
        }

        // Benutzer speichern
        user.save()

            // Benutzer zurückgeben
            .then(() => res.json({
                status: 200,
                message: 'OK'
            }))

            // Error-Handling
            .catch(reason => internalServerError(res, reason));
    });

    app.get('/users/:id/history', async (req, res) => {
        // Benutzer laden
        const user = await db['user'].findByPk(req.params.id);

        // Pruefen ob Benutzer existiert
        if (R.isNil(user)) {
            notFound(res);
            return
        }

        // Score-History laden
        db['action'].findAll({
            where: { userId: user.id },
            order: [ [ 'createdAt', 'DESC' ] ],
            limit: 20
        })

            // History zurückgeben
            .then(actions => res.json({
                content: actions
            }))

            // Error-Handling
            .catch(reason => internalServerError(res, reason));
    });

};