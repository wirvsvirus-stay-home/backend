const models = require('../models');
const usernameGenerator = require('../services/username-generator.js');

module.exports = app => {

    app.post('/users', (req, res) => {
        // Username erstellen
        usernameGenerator.create()

            // Benutzer erstellen
            .then(username  => {
                return models['user'].create({
                    deviceId: req.body.deviceId,
                    username: username,
                    country: req.body.country,
                    latitude: req.body.latitude,
                    longitude: req.body.longitude,
                    radius: req.body.radius
                })
            })

            // Benutzer laden
            .then(({ id }) => models['user'].findByPk(id))

            // Benutzer zurückgeben
            .then(user => res.status(201).send({
                status: 201,
                message: "Created",
                user
            }));

    });

    app.get('/users?unprotected=1', function (req, res) {
        models['user'].findAll({
            where: {
                baseStatus: 'UNPROTECTED',
            }
        }).then(users => {
            console.log(users);
        });
        res.send({
            "deviceId": "1234-5678-6451",
            "username": "alex"
        });
    });

    app.get('/users/:deviceid', function (req, res){
        models['user'].findAll({
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
            models['user'].update({element: req.body[element]},{
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