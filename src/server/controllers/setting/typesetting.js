
'use stict'
const mongoose = require('mongoose'),
    Type = mongoose.model('Type'),
    useMore = require('../useMore')

exports.getType = function(req,res){
    Type.find().exec(function(err,type){
        if(err) return res.status(400).json(useMore.getErrorMessage(err))
        else res.json(type)
    })
}

exports.saveType = function(req,res){
    var type = new Type(req.body);
 
    type.save(err => {
        if(err) {
          return res.status(400).json(useMore.getErrorMessage(err))
        }else{
            res.send("Sucess save")
        }

    
    })
}
exports.updateType = function(req,res){

}
exports.deleteType = function(req,res){

}
exports.listType = function(req,res){
    console.log(req.type)
}
exports.typeId = function(req,res,next,id){
    Type.findById({_id:id}).exec((err,type)=>{
        if(err) return res.status(400).json(useMore.getErrorMessage(err));
        else req.typeId = type;
    })
}