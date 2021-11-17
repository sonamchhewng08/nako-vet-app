const jwt = require('jsonwebtoken');
exports.verify=(req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(authHeader){
        const token=authHeader.split(" ")[1];
        jwt.verify(token,"dlkafjkalfjiefjdjfiefjkdfjiafjdkjei",(err,user)=>{
            if(err) res.status(403).json("token not valid!");
            else {
                req.user=user;
                next();
            }
        })
    }else res.status(403).json("you are not authenticate");
}