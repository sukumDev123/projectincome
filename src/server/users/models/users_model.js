'use stict';
const mongoose = require('mongoose');
const crypto = require('crypto')
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    first: {
        type: String,
        required: "Please insert your First Name",
        trim: true
    },
    last: {
        type: String,
        required: 'Please insert your last Name',
        trim: true
    },
    displayName: {
        type: String,
        required: true
    },
    username: {
        unique: true,
        required: "Please insert your username",
        trim: true,
        type: String
    },
    password: {
        type: String,
        required: "Please insert your password",
        validate: [function (password) {
            return password && password.length > 10
        }, 'Please Input yours password and input password lenght > 10']
    },
    provider: {
        type: String,
        required: 'Provider is required'
    },
    roles: {
        type: String,
        enum: ['user', 'admin'],
        default: ['user']
    },
    salt: {
        type: String
    },
    updated: {
        type: Date
    },
    created: {
        type: Date,
        default: Date.now
    },
});

UserSchema.pre('save', function (next) {

    this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
    this.password = this.hashPassword(this.password);

    next();
});

/**
 * Create instance method for hashing a password
 */
UserSchema.methods.hashPassword = function (password) {

    return crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('base64');

};

/**
 * Create instance method for authenticating user
 */
UserSchema.methods.authenticate = function (password) {
    return this.password === this.hashPassword(password);
};

/**
 * Find possible not used username
 */
UserSchema.statics.findUniqueUsername = function (username, suffix, callback) {
    var _this = this;
    var possibleUsername = username + (suffix || '');

    _this.findOne({
        username: possibleUsername
    }, function (err, user) {
        if (!err) {
            if (!user) {
                callback(possibleUsername);
            } else {
                return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
            }
        } else {
            callback(null);
        }
    });
};

mongoose.model('User', UserSchema);