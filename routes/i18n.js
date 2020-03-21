const fs = require('fs');
const path = require('path');

module.exports = app => {

    app.get('/i18n/:countryCode', (req, res) => {
        const { countryCode } = req.params;

        // Pruefen ob countryCode angegeben wurde
        if (countryCode == null) {
            res.status(404).send({ status: 404, message: "Not Found" });
            return;
        }

        // Pfad zu Sprachdatei ermittlen
        const languageFile = path.join(__dirname, '..', 'i18n', path.basename(countryCode)) + '.json';

        // Datei einlesen und zurückgeben
        fs.readFile(languageFile, 'utf8', (err, data) => {
            // Wenn Datei nicht eingelesen werden konnt, 404 zurückgeben
            if (err) {
                res.status(404).send({ status: 404, message: "Not Found" });
                return;
            }

            res.type('application/json').send(data);
        });
    })

};