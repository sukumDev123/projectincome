'use stict';
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const TypeAnSubtype = new Schema({
    typeMoney:{
        type:String,
        unique:true,
        require:true
    },
    numberType:{
        type:Number,
        unique:true,
        require:true
    },
    subtype : {
        type:String,
        unique:true,
        default:null
    },
    create_at:{
        type:Date,
        default:Date.now()
    },
    update_at:{
        type:Date,
        default:Date.now()
    }
});
mongoose.model('Type',TypeAnSubtype);