const mongoose = require('mongoose');
const schema=new mongoose.Schema({
    _id:Number,
    Name:String,
    Phone:Number,
    Village:String,
    date:{
        type:String,
        default:new Date().toLocaleDateString()
    }
});
const model = mongoose.model('entry',schema);
module.exports=model;