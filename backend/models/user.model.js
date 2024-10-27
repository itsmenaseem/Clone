import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    fullName:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    profilePicture:{type:String},
    followers:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
    following:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
    tweets:[{type:mongoose.Schema.Types.ObjectId,ref:"Tweet"}],
    coverImage:{type:String}
},{timestamps:true});

export default mongoose.model("User",userSchema);