import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET
if(!secret){
    throw new Error("JWT_SECRET is not defined in environment variables")
}

const generateToken = (userId:any)=>{
    const token = jwt.sign({userId},secret, {expiresIn:'7d'})
    return token;
}

//controller for user registration
//post:/api/users/register

export const registerUser = async(req:Request,res:Response) => {
    try{
     const {name, email, password} = req.body;
     
     if(!name || !email || !password){
        return res.status(400).json({message:"Missing required fields"})
     }

     const user = await User.findOne({email})
     if(user){
        return res.status(400).json({message:"User already exist"})
     }

     //create new user
     const hashedPassword = await bcrypt.hash(password, 10)
     const newUser = await User.create({
        name, email, password:hashedPassword
     })
     // return success message
     const token = generateToken(newUser._id)
     return res.status(201).json({
        message:"User created successfully",
        user:{
        id:newUser._id,
        name:newUser.name,
        email:newUser.email,
      },
      token,
      })
    }catch(error){
        if(error instanceof Error){
         return res.status(400).json({message:error.message})
        }
        return res.status(400).json({message:"An unknown error occured"})
    }
}

//controller for user login
//POST:/api/users/login

export const loginUser = async(req:Request, res:Response) => {
    try{
      const {email, password} = req.body;
      if(!email || !password){
        return res.status(400).json({message:"Missing required fields"})
      }

      const user = await User.findOne({email})
      if(!user){
        return res.status(400).json({message:"Invalid email or password"})
      }
      //checking the password is correct
      if(!user.comparePassword(password)){
        return res.status(400).json({message:"Invalid email or password"})
      }

      //return success message
      const token = generateToken(user._id)
      return res.status(200).json({
        message:"Login successful",
        user:{
        id:user._id,
        name:user.name,
        email:user.email,
        },
        token
        
      })
    }catch(error){
        if(error instanceof Error){
            return res.status(400).json({message:error.message})
        }
        return res.status(400).json({message:"An unknown error occured"})
    }
}
