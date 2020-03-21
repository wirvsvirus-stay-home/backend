module.exports = app => {

    app.get('/i18n/:CountryCode', function (req, res){
        res.send(__filename)
        // {
        //     "welcome": "Hallo :username:",
        //     "save": "Speichern",
        //     // ....
        // }
    });

};