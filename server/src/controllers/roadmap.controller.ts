import { Request, Response } from "express";
import { generateRoadmap } from "../services/roadmap.service";

export const createRoadmap = async(req:Request, res:Response) => {
    try{
      const {formData} = req.body;
        
      if(!formData || Object.keys(formData).length ===0) {
        res.status(400).json({
            success:false,
            message:"Form data is required"
        })
      }

      const roadmap = await generateRoadmap(formData);
      return res.status(200).json({
        success:true,
        roadmap
   });
    
   }catch (error){
      console.error("Roadmap generation error:", error)
    }

    return res.status(500).json({
        success:false,
        message:"Failed to generate roadmap"
    })
};