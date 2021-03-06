module.exports = function(req, res, next) {

    res.sendHttpError = function(error) {
        if (res.req.headers['x-requested-with'] == 'XMLHttpRequest') {
            res.json(error);
        } else {
            res.render('../templates/error', {error: error});
        }
    };

    next();
};