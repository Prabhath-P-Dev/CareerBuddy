import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const secret = process.env.JWT_SECRET;
if(!secret){
    throw new Error("JWT_SECRET is not defined in environment variables")
}

const protect = (req:Request, res:Response, next:NextFunction) => {
    const authHeader = req.headers.authorization;
    
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({message:"Unauthorized"})
    }
    
    const token = authHeader.split(" ")[1];
    
    try{
      const decoded = jwt.verify(token, secret)
      if( !decoded || typeof decoded === "string" || !("userId" in decoded)){
        return res.status(401).json({message:"Unauthorized"})
      }
      req.userId = decoded.userId;
      next();
    }catch(error){
        return res.status(401).json({message:"Unauthorized"})
    }
}

export default protect;

