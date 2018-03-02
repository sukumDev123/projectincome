'use strict';
const mongoose = require('mongoose');
const Income = mongoose.model('Income');
const config = require('../../config')
exports.rander = function (req, res) {
    res.render('./src/client/core/views/layout', {
        title: config.title,
        user: JSON.stringify(req.user) || null
    });
};
exports.incomeid = function (req, res, next, id) {

    Income.findById(id).select('_id').exec(function (err, resDD) {
        if (err) res.json(err);

        req.income = resDD;

        next();
    })

}
exports.viewsinformation = function (req, res) {
    Income.find().exec((err, infor) => {
        if (err) res.json(err);
        else res.json(infor);
    })
};
exports.addinformation = function (req, res) {
    const income = new Income({
        moneyInput: req.body.money,
        typeMoney: req.body.typeof,
        subtypeMoney: req.body.subtype,
        detailList: req.body.detaill,
        iduser: 'users'
    });
    income.save(err => {
        if (err) res.json(err);
        else res.json(income)
    })
};

exports.getinfor = function(req,res){
    var income = req.income;
    Income.findById({_id:income.id}).exec(function(err,infor){
        if(err) return err;
        else {
            res.json(infor);
        }
    })

}
exports.editinformation = function (req, res) {
    var income = new Income();
};
exports.deleteinformation = function (req, res) {

    var income = req.income;
    income.remove(function(err) {
        if (!err) {
            res.json("delete sucess")
        };

        
    })
};