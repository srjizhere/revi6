import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()

export const authMiddlware = async ( req : Request , res : Response , next : NextFunction) =>{
    try {
      const token = req.headers?.authorization?.split(" ")[1]
      
      if(!token){
        return res.status(401).send({ msg : "Unauthorized"})
      }

      const decodedToken : any = jwt.verify(token , process.env.SECRET_KEY)

      if(!decodedToken){
        return res.status(401).send({msg : "Invalid token"})
      }

      req.body.userId = decodedToken.userId;
      req.body.roles = decodedToken.roles;
      next()
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(500).json({ message: 'Authentication failed' });  
    }
}