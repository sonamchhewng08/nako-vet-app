const mongoose = require('mongoose');
const schema=new mongoose.Schema({
   username:{
       type:String,
       required:true,
       unique:true
   },
   password:{
       type:String,
       require:true
   },
    date:{
        type:Date,
        default:new Date().toLocaleDateString()
    }
});
const model = mongoose.model('user',schema);
module.exports=model;