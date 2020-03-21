const models = require('../models');

module.exports = app => {

    app.get('/leaders/:rank', function (req, res){
        models['user'].findAll({
            where: {
                rank: req.params.rank
            },
            attributes: ['username', 'score', 'country'],
            order:[
                sequelize.fn('max', sequelize.col('score'), 'DESC')
            ],
            limit: 20            
        }).then(leaders => {
            res.send(JSON.stringify(leaders));
        });
    });

};

