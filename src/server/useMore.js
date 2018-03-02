'use strict'
exports.getErrorMessage = function(err){
    var mess = '';
    for(var errName in err.errors){
       
        if(err.errors[errName].message){
            mess = err.errors[errName].message;
        }
    }
    return mess;
}