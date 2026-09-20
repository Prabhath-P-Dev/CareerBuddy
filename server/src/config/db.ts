import mongoose from "mongoose";

const connectDB = async() : Promise<void> => {
     try{
      mongoose.connection.on("connected", ()=>{console.log("Database connected succesfully")})

      let mongodbURI = process.env.MONGODB_URI;
      

      if(!mongodbURI){
        throw new Error("MONGODB_URI environment variable not set")
      }

      if(mongodbURI.endsWith('/')){
        mongodbURI = mongodbURI.slice(0, -1)
      }

      await mongoose.connect(mongodbURI)
    } catch(error){
      console.error("Error connecting to mongodb", error)
    }
}

export default connectDB;