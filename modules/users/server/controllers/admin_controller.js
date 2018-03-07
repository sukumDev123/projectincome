'use strict';
const path = require('path'),
    getError = require('../../../useMore'),
    User = require('mongoose').model('User');

exports.viewUsers = (req, res) => {
    if (req.user.roles === "admin") {
        User.find().populate('-created').select('-password -salt').exec((err, users) => {
            if (err) return res.status(400).json({
                mess: getError.getErrorMessage(err)
            });
            else {
                res.json(users);
            }
        })
    } else {
        return res.status(403).json({
            mess: "Admin only !"
        })
    }

}
exports.viewUser = (req, res) => {
    if(req.viewUserId.roles === 'admin'){
        res.status(403).json({mess: "Can't view information of admin "})
    }else{
        res.json(req.viewUserId)
    }
}
exports.userId = (req, res, next, id) => {
   var mess = null;
    User.findById({
        _id: id
    }).select('-password -salt').exec((err, user) => {
        if (err) {
            return res.status(404).json({
                mess: 'Not Find User'
            })
        } else {
            req.viewUserId = user;
           

        }
        next();
    })
}