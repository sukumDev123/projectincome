'use strict';
const mongoose = require('mongoose');
const Income = mongoose.model('Income');
const config = require('../../config')
exports.rander = function (req, res) {
    res.render('./src/client/core/views/layout', {
        title: config.title,
        user: null
    });
};
exports.incomeid = function(req,res,next,id){
    
    Income.findById(id).exec(function(err,resDD){
        if(err) res.json(err);
        
        req.income = resDD;

        next();
    })

}
exports.viewsinformation = function(req,res){
    Income.find().exec((err,infor)=>{
        if(err) res.json(err);
        else res.json(infor);
    })
};
exports.addinformation = function(req,res){
    const income = new Income({
        moneyInput : req.body.money,
        typeMoney: req.body.typeof,
        subtypeMoney:req.body.subtype,
        detailList:req.body.detaill,
        iduser:'users'
    });
    income.save( err => {
        if(err) res.json(err);
        else res.json(income)
    } )
};
exports.editinformation = function(req,res){

};
exports.deleteinformation = function(req,res){
    res.json(req.income)
}
