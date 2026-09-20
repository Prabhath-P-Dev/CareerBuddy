import { CareerFormData } from "../types/roadmap.types";
import { ai } from "../config/ai";


export const generateRoadmap = async(formData:CareerFormData) => {

  console.log("service data:", formData);
  console.log("service skills:", formData?.skills);
  
    const prompt = `
       You are a career guidance AI.

       Based on the following information, create a personalized career roadmap.

       skills:
       ${formData.skills.join(", ")}

       intersets:
       ${formData.interests.join(", ")}

       experienceLevel:
       ${formData.experienceLevel}

       create a clear learning roadmap for the user.

       Return the roadmap in this structure:
       {
         "career":"string",
         "overview":"string",
         "steps":[
         {
          "title":"string",
          "description":"string",
          "skills":["string"]
         }
         ]
       }
       
       Return only valid JSON. Do not include markdown or any extra text.
    `;

    const response = await ai.models.generateContent({
      model:"gemini-3.6-flash",
      contents:prompt

    });
    console.log(response.text)
    const text = response.text
    if(!text){
      throw new Error("No text returned from gemini response")
    }
    const roadmap=JSON.parse(text);
    return roadmap;
  
}