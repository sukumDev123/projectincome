
'use stict'
const mongoose = require('mongoose'),
    Type = mongoose.model('Type');

exports.getType = function(req,res){
    Type.find().exec(function(err,type){
        if(err) res.json(err);
        else res.redirect('/')
    })
}
exports.saveType = function(req,res){
    var type = new Type();
    type.typeMoney = req.body.typeMoney;
    type.subthpe = req.body.subthpe;
    
    type.save(err => {
        if(err) {
            res
            .status(400)
            .json(err);
        }

        res.send("Sucess save")
    })
}
exports.updateType = function(req,res){

}
exports.deleteType = function(req,res){

}
exports.typeId = function(req,res,next,id){

}