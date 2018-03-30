'use strict'

const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const Wanna = new Schema({
    product_name : {
        type : String,
        required : 'Please enter product your need.',

    },
    price_product : {
        type: Number,
        required : 'Please enter price product your need.'
    },
    create_at : {
        type : Date,
        default: Date.now
    },
    userId : {
        type :  String
    }
})

mongoose.model('Wanna',Wanna);