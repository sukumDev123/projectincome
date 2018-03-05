'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InComeModel = new Schema({
    moneyInput: {
        type: Number
    },
    typeMoney:{
        type:String
    },
    subtypeMoney:{
        type:String
    },
    detailList:{
        type:String
    },
    iduser:{
        type:String,
    },
    timeCreate:{
        type:Date,
        default:Date.now
    },
    update_at:{
        type:Date
    }
});

mongoose.model('Income',InComeModel);