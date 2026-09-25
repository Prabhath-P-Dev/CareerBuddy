import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import resend from "../config/resend";

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

//controller for forgot password
//POST: /api/users/forgot-password

export const forgotPassword = async(req:Request, res:Response) => {
  try{
   const {email} = req.body;
   const user = await User.findOne({email})
   
   if(!user){
    return res.status(500).json({
      success:false,
      message:"user not found"
    })
   }
   const resetToken = crypto.randomBytes(32).toString("hex");
   const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
   user.resetPasswordToken = hashedToken;
   user.resetPasswordExpires = new Date( Date.now() + 15* 60 * 1000);
   await user.save();

   const resetUrl = `http://localhost:5173/reset-Password/${resetToken}`;

   await resend.emails.send({
    from:"onboarding@resend.dev",
    to:user.email,
    subject:"Reset your password",
    html:`
      <h2> Password reset Request </h2>
      
      <p>Hello ${user.name},</p>
      <p>we received a request to reset your password</p>
      <p>
       <a href="${resetUrl}">
       Click here to reset your password
       </a>
       </p>
       <p> This link will expires in 10 minutes</p>
       <p>If you didn't request you can safely ignore this email</p>`
   })

   return res.status(200).json({
    success:true,
    message:"Password reset link sent successfully"
   })

  }catch(error:any){
    return res.status(500).json({
      success:false,
      message:"Internal server error"
    })
  }
}

//controller for reset password
//POST: /api/users/reset-password/:token

export const resetPassword = async(req:Request, res:Response) => {
  try{
    const {token} = req.params;
    if(!token || Array.isArray(token)) {
      return res.status(400).json({success:false, message:"Invalid token"})
    }
    const {password} = req.body;

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      resetPasswordToken:hashedToken,
      resetPasswordExpires:{$gt:Date.now()}
    });

    if(!user){
      return res.status(400).json({
        success:false,
        message:"Invalid or expired reset token"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return res.status(200).json({
      success:true,
      message:"Password changed successfully"
    });

   }catch(error:any){
    return res.status(500).json({
      success:false,
      message:"Internal server error"
    })
  }
}