import mongoose, {Document} from "mongoose";
import bcrypt from "bcrypt"

export interface IUser extends Document {
    name:string;
    email:string;
    password:string;
    comparePassword(candidatePassword:string):Promise<boolean>;
    resetPasswordToken?:string | undefined;
    resetPasswordExpires?:Date | undefined;
}
const UserSchema = new mongoose.Schema<IUser>({
    name:{type:String, required:true},
    email:{type:String,required:true},
    password:{type:String, required:true},
    resetPasswordToken:{type:String},
    resetPasswordExpires:{type:Date}

},{timestamps:true})

UserSchema.methods.comparePassword = function(password:string){
  return bcrypt.compareSync(password, this.password)
}

const User = mongoose.model<IUser>("User", UserSchema);

export default User;