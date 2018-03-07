'use strict'

var getUniqueErrorMessage = function (err) {
    var output;

    try {
        var fieldName = err.errmsg.substring(err.errmsg.lastIndexOf('.$') + 2, err.errmsg.lastIndexOf('_1'));
        output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + ' already exists';

    } catch (ex) {
        output = 'Unique field already exists';
    }

    return output;
};


exports.getErrorMessage = function (err) {
    var mess = '';
   if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                mess = getUniqueErrorMessage(err).substr(57,(getUniqueErrorMessage(err).length-1));
                break;
            default:
                mess = 'Something went wrong';
        }
    } else {
        for (var errName in err.errors) {

            if (err.errors[errName].message) {
                mess = err.errors[errName].message;
            }
        }
    }
    return mess;
}