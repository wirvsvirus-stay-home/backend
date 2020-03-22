const db = require('../models');
const { internalServerError, notFound } = require('../utils/http');

module.exports = app => {

    app.post('/actions', async (req, res) => {
        // Benutzer-ID holen
        const userId = req.headers['x-user-id'];

        if (userId === undefined || userId === null) {
            notFound(res);
            return;
        }

        // Benutzer laden
        db['user'].findByPk(userId)

            .then(user => db['action'].create({
                userId: user.id,
                type: req.body.type,
                amount: req.body.amount,
            }))

            // Action laden
            .then(({ id }) => db['action'].findByPk(id))

            // Action zurückgeben
            .then(action => res.status(201).send({
                status: 201,
                message: "Created",
                action
            }))

            // Error-Handling
            .catch(reason => internalServerError(res, reason));
    });

};