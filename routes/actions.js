const moment = require('moment');
const R = require('ramda');
const { Op } = require('sequelize');
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

        // Letzten Check-In laden
        const lastCheckIn = await db['action'].findOne({
            where: {
                userId: userId,
                type: 'CHECK_IN',
            },
            order: [
                [ 'createdAt', 'DESC' ]
            ]
        });

        // Pruefen ob mindestst eine Stunde seit dem letzten Call vergangen ist
        if (R.is(Object, lastCheckIn)) {
            const minDiff = 3600;
            const diffToLast = moment().diff(lastCheckIn.createdAt, 'seconds');
            if (diffToLast < minDiff) {
                res.status(423).json({
                    status: 423,
                    message: `Locked`,
                    secondsToWait: minDiff - diffToLast
                });
                return;
            }
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

    app.post('/actions/attack', async (req, res) => {
        // User-ID des Attackers holen
        const attackerUserId = req.headers['x-user-id'];

        // Pruefen ob User-ID angegeben wurden
        if (R.isNil(attackerUserId)) {
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
        const targetUser = await db['user'].findOne({
            where: {
                id: { [Op.ne]: attackerUserId },
                baseStatus: 'UNPROTECTED',
                [Op.or]: {
                    rank: { [Op.gt]: 1 },
                    score: { [Op.gt]: 0 },
                }
            },
            order: db.sequelize.random(),
        });

        // Attacker ein Ticket abziehen
        attackerUser.tickets -= 3;

        // Bonus ermitteln (100 wenn noch unproteced Bases existieren; 200 wenn nicht)
        const bonus = R.isNil(targetUser) ? 200 : 100;

        // Attacker 100 oder 200 (wenn es keine unprotected Base gibt) Punkte hinzufügen
        addToScore(attackerUser, bonus);

        // ggf. Target 100 abziehen
        if (R.is(Object, targetUser)) {
            addToScore(targetUser, -100);
        }

        // Action für Attacker erstellen
        db['action'].create({
            type: 'ATTACK',
            amount: bonus,
            userId: attackerUserId
        })

            // Action zurückgeben
            .then(action => res.status(201).json({
                status: 201,
                message: 'CREATED',
                user: R.is(Object, targetUser) ? { username: targetUser.username } : null,
                action
            }))

            .catch(reason => internalServerError(res, reason));

        // ggf. Action für Target erstellen
        if (R.is(Object, targetUser)) {
            db['action'].create({
                type: 'ATTACK',
                amount: -100,
                userId: targetUser.id
            });
        }
    });

};