const sequelize = require('../services/sequelize');
const User = require('../models/User');

module.exports = app => {

    app.post('/users', function (req, res){
        sequelize.sync()
            .then(() => User.create({
                deviceId: req.body.deviceId,
                username: req.body.username,
                country: req.body.country,
                score: req.body.score,
                rank: req.body.rank,
                baseStatus: req.body.baseStatus,
                latitude: req.body.latitude,
                longitude: req.body.longitude,
                radius: req.body.radius
            }))
            .then(jane => {
                console.log(jane.toJSON());
            });
        res.send({
            "status": 201,
            "message": "created"
        })
    });

    app.get('/users?unprotected=1', function (req, res) {
        User.findAll({
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
        User.findAll({
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
            
        }
        res.send({
            "status": 200,
            "message": "OK"
        })
    });

};