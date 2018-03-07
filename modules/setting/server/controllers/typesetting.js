'use stict'
const mongoose = require('mongoose'),
    Type = mongoose.model('Type'),
    useMore = require('../../../useMore')

exports.getType = function (req, res) {
    Type.find({
        iduser: req.user._id
    }).exec(function (err, type) {
        if (err) return res.status(400).json(useMore.getErrorMessage(err))
        else res.json(type)
    })

}

exports.saveType = function (req, res) {

    if (req.user) {
        var type = new Type(req.body);
        type.iduser = req.user._id;
        type.save(err => {
            if (err) {
                return res.status(400).json(useMore.getErrorMessage(err))
            } else {
                res.json(type)
            }


        })
    }else{
        res.redirect('/')
    }
}
exports.updateType = function (req, res) {

}
exports.deleteType = function (req, res) {
    const type = req.typeId;
    var mess = '';
    type.remove(err => {
        if (err) return res.status(404).json(useMore.getErrorMessage(err));
        else res.json({
            mess: 'Delete Sucess'
        })
    })
}
exports.listType = function (req, res) {
    console.log(req.typeId)
}
exports.typeId = function (req, res, next, id) {
    Type.findById({
        _id: id
    }).select('_id').exec((err, type) => {
        if (err) return res.status(400).json(useMore.getErrorMessage(err));
        req.typeId = type;
        next();
    })
}