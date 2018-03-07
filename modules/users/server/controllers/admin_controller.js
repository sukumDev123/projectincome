'use strict';
const path = require('path'),
    getError = require('../../../useMore'),
    User = require('mongoose').model('User');

exports.viewUsers = (req, res) => {
    if(req.user.roles == "admin" ){
        User.find().populate('-_id').exec( (err,users) => {
            if(err) return res.status(400).json({
                mess : getError(err)
            });
            else{
                res.json(users);
            }
        } )
    }else{
        return res.status(403).json({mess : "Admin only !"})
    }
    
}