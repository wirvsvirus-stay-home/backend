var express = require('express');
var app = express();

// GET

app.get('/users?unprotected=1', function (req, res) {
    // {
    //     "deviceId": "1234-5678-6451",
    //     "username": "alex"
    // }
});

app.get('/users/:[deviceid]', function (req, res){
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

app.get('/leaders', function (req, res){
    // ...
});

app.get('/il8n/:[countryCode]', function (req, res){
    // {
    //     "welcome": "Hallo :username:",
    //     "save": "Speichern",
    //     // ....
    // }
});

//POST

app.post('/users', function (req, res){
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
});

//PUT

app.put('/users/:[deviceid]', function(req, res){
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

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});