const mongoose=require('mongoose');
const url=`mongodb+srv://admin:admin@cluster.jl73q.mongodb.net/VetApp?retryWrites=true&w=majority`;
mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true},()=>{
    console.log("connected")
});