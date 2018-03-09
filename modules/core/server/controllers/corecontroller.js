'use strict';
const path = require('path')
const mongoose = require('mongoose');
const Income = mongoose.model('Income');
const config = require(path.resolve('./config/config'));
const User = mongoose.model('User');
const getError = require('../../../useMore');
//const Money = mongoose.model('MoneyTotal')
exports.rander = function (req, res) {
    res.render(path.resolve('./modules/core/client/views/layout'), {
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

     Income.find({
         iduser: req.user.id
     }).sort('-_id').exec((err, infor) => {
         if (err) res.json(err);
         else res.json(infor);
     })
};
exports.addinformation = function (req, res) {
    if (req.user) {
        const income = new Income({
            moneyInput: req.body.money,
            typeMoney: req.body.typeof,
            subtypeMoney: req.body.subtype,
            detailList: req.body.detaill,
            iduser: req.user._id
        });
        income.save(err => {
            if (err) res.json(err);
            else res.json(income)
        })
    } else {
        return res.status(500).send("Users not login .")
    }
};

exports.getinfor = function (req, res) {
    var income = req.income;
    Income.findById({
        _id: income.id
    }).exec(function (err, infor) {
        if (err) return err;
        else {
            res.json(infor);
        }
    })

}
exports.editinformation = function (req, res) {
    let mess = '';
    console.log(req.income._id)
    Income.findById({
        _id: req.income._id
    }).exec((err, income) => {
        if (err) {
            return res.status(404).json({
                mess: getError.getErrorMessage(err)
            })
        } else {
            income.set(req.body);
            income.set({
                update_at: Date.now()
            })
            income.save(err => {
                if (err) {
                    return res.status(405).json({
                        mess: getError.getErrorMessage(err)
                    })
                }
                res.json(income)
            })
        }
        /* */
    })
};
exports.deleteinformation = function (req, res) {

    var income = req.income;
    income.remove(function (err) {
        if (!err) {
            res.json("delete sucess")
        };


    })
};