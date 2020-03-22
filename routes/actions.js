const R = require('ramda');
const db = require('../models');
const { addToScore } = require('../utils/user');
const { internalServerError, notFound } = require('../utils/http');

module.exports = app => {

    app.post('/actions/check-in', async (req, res) => {
        // Benutzer-ID holen
        const userId = req.headers['x-user-id'];

        // Pruefen ob User-ID angegeben wurde
        if (R.isNil(userId)) {
            notFound(res);
            return;
        }

        // Benutzer laden
        const user = await db['user'].findByPk(userId);

        // Pruefen ob Benutzer existiert
        if (R.isNil(user)) {
            notFound(res);
            return;
        }

        // Action erstellen
        db['action'].create({
            userId: user.id,
            type: 'CHECK_IN',
            amount: 100,
        })

            // Action zurückgeben
            .then(action => res.status(201).send({
                status: 201,
                message: "Created",
                action
            }))

            // Benutzer ein Ticket hinzufügen
            .then(() => {
                user.tickets += 1;
                user.save();
            })

            // Error-Handling
            .catch(reason => internalServerError(res, reason));
    });

    app.post('/actions/attack/:userId', async (req, res) => {
        // Benutzer-IDs des Attackers und des Targets holen
        const attackerUserId = req.headers['x-user-id'];
        const targetUserId = req.params.userId;

        // Pruefen ob User-IDs angegeben wurden
        if (R.isNil(attackerUserId) || R.isNil(targetUserId)) {
            notFound(res);
            return;
        }

        // Attacker laden
        const attackerUser = await db['user'].findByPk(attackerUserId);

        // Pruefen ob Attacker existiert
        if (R.isNil(attackerUser)) {
            notFound(res);
            return;
        }

        // Pruefen ob Attacker ausreichend Tickets besitzt
        if (attackerUser.tickets < 3) {
            res.status(402).json({
                status: 402,
                message: "Payment Required"
            });
            return;
        }

        // Target-User laden
        const targetUser = await db['user'].findByPk(targetUserId);

        // Pruefen ob Benutzer existieren
        if (R.isNil(targetUser)) {
            notFound(res);
            return;
        }

        // Pruefen ob Target `UNPROTECTED` ist
        if (targetUser.baseStatus !== 'UNPROTECTED') {
            res.status(423).json({
                status: 423,
                message: 'Locked'
            });
            return;
        }

        // Attacker ein Ticket abziehen
        attackerUser.tickets -= 3;

        // Attacker 100 Punkte hinzufügen, Target 100 Punkte abziehen
        addToScore(attackerUser, 100);
        addToScore(targetUser, -100);

        // Action für Attacker erstellen
        db['action'].create({
            type: 'ATTACK',
            amount: 100,
            userId: attackerUserId
        })

            // Action zurückgeben
            .then(action => res.status(201).json({
                status: 201,
                message: 'CREATED',
                user: action
            }))

            .catch(reason => internalServerError(res, reason));

        // Action für Target erstellen
        db['action'].create({
            type: 'ATTACK',
            amount: -100,
            userId: targetUserId
        });
    });

};