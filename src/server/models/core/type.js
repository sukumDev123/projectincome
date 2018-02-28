'use stict';
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const TypeAnSubtype = new Schema({
    typeMoney:{
        type:String,
        enum: ['รายรับ','รายจ่าย','เงินออม']
    },
    subtype : {
        type:String,
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