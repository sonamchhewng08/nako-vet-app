const express = require('express');
const app = express();
const jwt=require('jsonwebtoken')
const router=new express.Router();
const user= require('../models/admin');

app.use(router);
router.use(express.json());
router.use(express.urlencoded({extended:true}));
router.post('/login',(req,res,next)=>{
    const {username,password}=req.body;
    user.findOne({username})
    .then((user)=>{
        if(password===user.password){
            const token=jwt.sign({ id: user.id, username: user.username }, "dlkafjkalfjiefjdjfiefjkdfjiafjdkjei",{ expiresIn: '2h' });
            res.status(200).json({
                id:user.id,
                username:user.username,
                token:token
            })
        }else{
            res.status(403).send("Username or password invalid")
        }
    }).catch((err)=>{
        console.log(err);
        res.status(403).send("user not found")
    })
        // if(user){
        //     if(password===user.password){
        //         const token=jwt.sign({ id: user.id, username: user.username }, "dlkafjkalfjiefjdjfiefjkdfjiafjdkjei",{ expiresIn: '2h' });
        //         res.status(200).json({
        //             id:user.id,
        //             username:user.username,
        //             token:token
        //         })
        //     }else{
        //         res.status(403).send("Username or password invalid")
        //     }
            
        // }else{
        //     res.status(403).send("user not found")
        // }
    // })
})

module.exports=router;