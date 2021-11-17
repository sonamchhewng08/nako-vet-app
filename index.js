const express= require('express');
const app =express();
require('./db/db');
require('./models/TagNumber');
const router1= require('./Router/getTag');
const router2= require('./Router/user');
const port=process.env.PORT || 8080;

app.use('/data',router1);
app.use('/user',router2);
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.listen(port,()=>{console.log("server started...")});
