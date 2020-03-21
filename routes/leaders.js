module.exports = app => {

    app.get('/leaders', function (req, res){
        res.send(__filename)
    });

};

