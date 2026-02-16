import mongoose ,{Schema,Document} from "mongoose";
import { timeStamp } from "node:console";


export interface IUser extends Document{
    email:"string",
    password:"string",
    name:"string"
};
const UserSchema:Schema = new Schema({
    email:{type:String, required:  true, unique: true},
    password :{type:String, requered :true},
    name :{type:String,requered:true},
}, {timestamps:true});



export default mongoose.model<IUser>("User",UserSchema)