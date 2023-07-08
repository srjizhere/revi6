import mongoose , {Schema , Document} from "mongoose";

export interface IUser extends Document {
    email  : string;
    username : string;
    password : string;
    roles : string[];
}
export enum UserRole {
    VIEWER = "VIEWER",
    CREATOR = "CREATOR",
    VIEW_ALL = "VIEW_ALL"
}


const userSchema : Schema = new Schema({
    username : {type : String,required : true},
    email : {type : String , required : true},
    password : {type : String, required : true},
    roles : [{type : String , enum : Object.values(UserRole) , default : UserRole.VIEWER}]
})

export const User = mongoose.model<IUser>('User',userSchema)