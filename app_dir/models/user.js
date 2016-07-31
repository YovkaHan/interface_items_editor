var crypto = require('crypto');
var async = require('async');
var util = require('util');
var config = require('../config');
var mongoose = require('../libs/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    elements: Schema.Types.Mixed
});

schema.methods.encryptPassword = function(password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

schema.virtual('password')
    .set(function(password){
        this._plainPassword = password;
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function() { return this._plainPassword;});

schema.methods.checkPassword = function(password) {
    return this.encryptPassword(password) === this.hashedPassword;
};

schema.statics.saveElement = function(id ,element, data, callback) {
    var User = this;
    var num = f(element);
    async.waterfall([
        function(callback) {
            User.findOne({"_id": id}).select({'_id':0}).exec(callback);
        },
        function(callback) {
            callback.elements[num].width = data.width+'px';
            callback.elements[num].height = data.height+'px';
            callback.elements[num].top = data.top+'px';
            callback.elements[num].left = data.left+'px';
            callback.elements[num].background_color = data.background_color;
            callback.elements[num].z_index = data.z_index;

            console.log(callback);

            var query = {"_id": id};
            User.findOneAndUpdate(query, callback).exec(callback);
        }
        ], callback);
};

schema.statics.authorize = function(username, password, callback) {
    var User = this;

    async.waterfall([
        function(callback) {
            User.findOne({username: username}, callback);
        },
        function(user, callback){
            if(user) {
                if(user.checkPassword(password)){
                    callback(null, user);
                } else {
                    next(new AuthError("Пароль неверен"));
                }
            } else {
                var user = new User({username: username, password : password});
                user.elements = config.get('elements');
                user.save(function(err) {
                    if(err) return callback(err);
                    callback(null, user);
                });
            }
        }
    ], callback);
};

exports.User = mongoose.model('User', schema);

function AuthError(status, message) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, AuthError);

    this.message = message;
}

util.inherits(AuthError, Error);

AuthError.prototype.name = 'HttpError';

exports.AuthError = AuthError;

function f(word) {
    switch (word){
        case 'side_tb':
            return 0;
            break;
        case 'profile':
            return 1;
            break;
        case 'action_':
            return 2;
            break;
        case 'settings':
            return 3;
            break;
        case 'commercial':
            return 4;
            break;
    }
}