'use strict';

module.exports = {

    internalServerError(res, reason) {
        res.status(500).json({
            status: 500,
            message: 'Internal Server Error',
            reason
        })
    }

};