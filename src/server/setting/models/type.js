'use stict';
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const TypeAnSubtype = new Schema({
    typeMoney:{
        type:String,
        trim:true,
        required:true,
        enum: ['รายรับ','รายจ่าย','เงินออม'],

    },
    subtype : {
        type:String,
        required:true,
        trim:true,
        unique:true
        
    },
    iduser:{
        type:String,
        default:'user'
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