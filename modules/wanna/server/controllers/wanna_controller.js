'use strict';
const Wanna = require('mongoose').model('Wanna');
const getError = require('../../../useMore')
exports.save_add = (req, res) => {
    if (req.user) {
        let wanna = new Wanna(req.body);
        wanna.userId = req.user._id;
        wanna.save(err => {
            if (err) {
                return res.status(404).json(getError.getErrorMessage(err));
            }else{
                res.json({message : "บันทึกรายการเรียบร้อย..."});
            }
        })
  
    } else {
        return res.status(403).json({
            message: " not found user ! "
        });
    }

}
exports.views = (req, res) => {
    if (req.user) {
        Wanna.find({
            userId: req.user._id
        }).exec((err, user) => {
            if (err) {
                return res.status(404).json(getError.getErrorMessage(err));
            } else {
                return res.json(user)
            }
        })
    } else {
        return res.status(403).json({
            message: " not found user ! "
        });

    }
}
exports.wanna_put = (req, res) => {

}
exports.wanna_delete = (req, res) => {

}