const express=require('express');
const router=express.Router();

module.exports=(io)=>{
 router.post('/',async(req,res)=>{
  const vote=req.body;
  io.emit('vote',vote);
  res.json(vote);
 });
 return router;
};
