const sequelize = require('../services/sequelize');
const User = require('../models/User');

module.exports = app => {

    app.post('/users', function (req, res){
        sequelize.sync()
            .then(() => User.create({
                deviceId: '1234-5678-1234',
                username: 'janedoe',
                country: 'DE',
                score: 800,
                rank: 3,
                baseStatus: 'PROTECTED',
                latitude: "37.285951",
                longitude: "-121.936650",
                radius: 100
            }))
            .then(jane => {
                console.log(jane.toJSON());
            });
        //req
        // {
        //     "deviceId": "1234-5678-9012",
        //     "username": "alex",
        //     "countryCode": "DE",
        //     "latitude": 37.285951,
        //     "longitude": -121.936650,
        //     "radius": 100
        // }
        //res
        // {
        //     "status": 201,
        //     "message": "Created"
        // }
        console.log(req.body);
        res.send({
            "status": 201,
            "message": "created"
        })
    });

    app.get('/users?unprotected=1', function (req, res) {
        res.send(__filename)
        // {
        //     "deviceId": "1234-5678-6451",
        //     "username": "alex"
        // }
    });

    app.get('/users/:deviceid', function (req, res){
        res.send(__filename)
        // {
        //     "username": "alex",
        //     "rank": 2,
        //     "score": 950,
        //     "countryCode": "DE",
        //     "latitude": 37.285951,
        //     "longitude": -121.936650,
        //     "radius": 100,
        //     "baseStatus": "PROTECTED"
        // }
    });

    app.put('/users/:deviceid', function(req, res){
        res.send(__filename)
        //req
        // {
        //     "username": "kim",
        //     "countryCode": "IT",
        //     "rank": 2,
        //     "score": 850,
        //     "baseStatus": "PROTECTED"
        // }
        //res
        // {
        //     "status": 200,
        //     "message": "OK"
        // }
    });

};