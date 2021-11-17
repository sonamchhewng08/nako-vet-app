const express = require('express');
const app = express();
const router=new express.Router();
const entry = require('../models/TagNumber');
const auth=require('./auth');
app.use(router);
router.use(express.json());
router.use(express.urlencoded({extended:true}));

router.get('/search/:id',(req,res,next)=>{
    entry.findById(req.params.id)
    .then((data)=>{
        res.status(200).json(data);
    }).catch((err)=>{
        res.status(500).json({err:err});
    })
})
router.post('/add',auth.verify,(req,res,next)=>{ 
    const data= new entry(req.body);
    data.save().then((data)=>{
        res.status(200).json({msg:"data added"});
        return;
    }).catch((err)=>{
        res.status(500).json({msg:err});
        return;
    })
})
router.put('/update/:id',auth.verify,(req,res,next)=>{
    entry.findByIdAndUpdate(req.params.id,req.body,{new:true})
    .then((data)=>{
        res.status(200).json(data);
        console.log(data);
    }).catch((err)=>{
        res.status(500).json({error:err});
    })
})
router.get('/alldata',auth.verify,(req,res,next)=>{
    entry.find().sort({'_id':1}).then((data)=>res.status(200).json(data))
    .catch((err)=>{
        console.log(err);
        res.status(501).json({error:err});
    })
});
router.delete('/delete/:id',auth.verify,(req,res,next)=>{
    const id=req.params.id;
    entry.findByIdAndRemove(id,{new:true})
    .then((data)=>{
        res.status(200).json(data);
        console.log(data);
    }).catch((err)=>{
        res.status(500).json({error:err});
    })
})
module.exports=router;