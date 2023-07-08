import express from 'express';
const fs = require('fs');
export  default  (req: express.Request, res: express.Response, next:express.NextFunction) => {
  const url = req.originalUrl;
  fs.appendFile("logger.txt","\n"+` IP : ${req.ip} [${new Date().toDateString()}] ${req.originalUrl}  ${req.method}`,(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log(` IP :${req.ip} | Date -:[${new Date().toDateString()}] ${req.method} ${req.originalUrl} `);
    }
  })
  next();
};

