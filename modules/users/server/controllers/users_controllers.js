'use stict'

var User = require('mongoose').model('User');
var path = require("path");
var passport = require('passport');
var errorHandler = require('../../../useMore');
var _ = require('lodash')
var whitelistedFields = ['first', 'last', 'email'];

exports.create = (req, res) => {
 var user = new User(req.body);
 var message = null;

 // Add missing user fields
 user.provider = 'local';
 user.displayName = user.first + ' ' + user.last;

 // Then save the user
 user.save(function(err) {
     if (err) {
        return res.status(400).json({
            message: errorHandler.getErrorMessage(err)
        });
     } else {
         // Remove sensitive data before login
         user.password = undefined;
         user.salt = undefined;

         req.login(user, function(err) {
             if (err) {
                 res.status(400).send(err);
             } else {
                 res.json(user);
             }
         });
     }
 });

};
exports.logout = function(req,res){
    req.logout();
    res.redirect('/');
}
exports.signin = function(req,res,next){
    
   passport.authenticate('local', function(err, user, info) {
        if (err || !user) {
            console.log(user)
            res.status(400).send(info);
        } else {
            // Remove sensitive data before login
            user.password = undefined;
            user.salt = undefined;

            req.login(user, function(err) {
                if (err) {
                    res.status(400).send(err);
                } else {
                    res.json(user);
                }
            });
        }
    })(req, res, next);
}

exports.updateData = (req,res)=>{
    let message = null;
    var user = req.user;

    if (user) {
      // Update whitelisted fields only
      user = _.extend(user, _.pick(req.body, whitelistedFields));
      user.updated = Date.now();
      user.displayName = user.first + ' ' + user.last;
      user.save(function (err) {
        if (err) {
          return res.status(422).send({
            message: errorHandler.getErrorMessage(err)
          });
        } else {
          req.login(user, function (err) {
            if (err) {
              res.status(400).send(err);
            } else {
              res.json(user);
            }
          });
        }
      });
    } else {
      res.status(401).send({
        message: 'User is not signed in'
      });
    }
   
    
}
