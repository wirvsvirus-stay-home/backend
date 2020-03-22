'use strict';

module.exports = {

    internalServerError(res, reason) {
        res.status(500).json({
            status: 500,
            message: 'Internal Server Error',
            reason
        })
    },

    notFound(res) {
        res.status(404).json({
            status: 404,
            message: 'Not Found',
        })
    }

};