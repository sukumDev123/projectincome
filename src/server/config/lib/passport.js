const passport = require('passport');
const mongoose = require('mongoose');
const path = require('path');
const localS = require('passport-local').Strategy;
module.exports = () => {
    var User = mongoose.model('User');

    passport.serializeUser((user, done) => {
        done(null, user.id)
    });
    passport.deserializeUser((id, done) => {
        User.findOne({ _id: id }, '-password -salt', (err, user) => {
            done(err, user);
        });
    });
    require(path.resolve('src/server/users/strategies/local'))();
  
};