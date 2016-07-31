var User = require('../models/user').User;
var HttpError = require('../error').HttpError;
var AuthError = require('../models/user').AuthError;

exports.get = function(req, res) {
  res.render('../templates/main', {
          user: req.user
  });
};
exports.post = function(req,res, next) {
    var data = {
        width: req.body.width,
        height: req.body.height,
        top: req.body.top,
        left: req.body.left,
        background_color: req.body.background_color,
        z_index: req.body.z_index
    };
    var element =  req.body.element;
    console.log(req.session.user);
    User.saveElement(req.session.user,element, data, function(err, user) {
        if(err) {
            if (err instanceof AuthError) {
                return next(new HttpError(403, err.message));
            } else {
                return next(err);
            }
        }
        res.send({});
    });
};