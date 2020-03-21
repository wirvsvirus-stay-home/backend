const db = require('../models');
const usernameGenerator = require('../services/username-generator.js');

module.exports = app => {

    app.post('/users', (req, res) => {
        // Username erstellen
        usernameGenerator.create()

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
            .catch(reason => res.status(500).json({
                status: 500,
                message: "Internal Server Error",
                reason
            }));

    });

    app.get('/users', function (req, res) {
        const { unprotected } = req.query;

        // Pruefen ob `unprotected` Query-Param angegeben wurde
        if (unprotected == null) {
            res.status(400).json({
                status: 400,
                message: "Bad Request"
            });
            return;
        }

        // Benutzer laden
        db['user'].findOne({
            attributes: ['id', 'username', 'score', 'rank'],
            where: { baseStatus: 'UNPROTECTED' },
            order: db.sequelize.random()
        })

            // Benutzer zurückgeben
            .then(user => res.json(user))

            // Error-Handling
            .catch(reason => res.status(500).json({
                status: 500,
                message: 'Internal Server Error',
                reason
            }));
    });

    app.get('/users/:deviceid', function (req, res){
        db['user'].findAll({
            where: {
                deviceId: req.params.deviceId
            }
        }).then(user => {
            res.send({
                username: user.username,
                country: user.country,
                score: user.score,
                rank: user.rank,
                baseStatus: user.baseStatus,
                latitude: user.latitude,
                longitude: user.longitude,
                radius: user.radius
            });
        });
    });

    app.put('/users/:deviceid', function(req, res){
        for(element in req.body){
            db['user'].update({element: req.body[element]},{
                where: {
                    deviceId: req.params.deviceId
                }
            });
        }
        res.send({
            "status": 200,
            "message": "OK"
        })
    });

};