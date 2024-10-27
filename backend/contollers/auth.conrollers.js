import express from 'express'
import userModel from '../models/user.model.js';
import bcryptjs from "bcryptjs"
import generateToken from '../lib/generateToken.js';
import validator from 'validator';



export const signup= async(req, res)=>{
    try {
    
        const {username,fullName,password,email}=req.body;
        if(!validator.isLength(username, {min:4, max:20})){
            return res.status(400).json({msg:"Username should be between 3 and 20 characters long"});
        }
        if(!validator.isLength(password, {min:6})){
            return res.status(400).json({msg:"Password should have at least 6 characters"});
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({msg:"Invalid email format"});
        }
        const isUsernameExist=await userModel.findOne({username});
        if(isUsernameExist){
            return res.status(400).json({msg:"Username already exists"});
        }
        const isEmailExist = await userModel.findOne({email});
        if(isEmailExist){
            return res.status(400).json({msg:"Email already exists"});
        }
        const salt=await bcryptjs.genSalt(10);
        const hashPassword=await bcryptjs.hash(password, salt);

        const user=new userModel({username,fullName,password:hashPassword,email});
        await user.save();
        user.password =undefined;
        generateToken(user._id,res);
        res.status(201).json({success:true,user});
    } catch (error) {
        console.log("error in signup",error);
        res.status(500).json({msg:"Server Error"});
    }
}


export const login= async(req, res)=>{
    try {
    
        const {username,password}=req.body;
        const user=await userModel.findOne({username});
        if(!user){
            return res.status(400).json({msg:"invalid credentials"});
        }
        const isPasswordMatch=await  bcryptjs.compare(password,user.password);
        console.log(isPasswordMatch);
        
        if(!isPasswordMatch){
            return res.status(400).json({msg:"invalid credentials"});
        }
        console.log(isPasswordMatch);
        
        generateToken(user._id,res);
        user.password=undefined;
        res.status(201).json({success:true,user});
    } catch (error) {
        console.log("error in login",error);
        res.status(500).json({msg:"Server Error"});
    }
}

export const logout=(req,res)=>{
    res.cookie("login","",{maxAge:0})
    return res.status(201).json({"msg":"logout successfully"});
}

export const myprofile = (req,res)=>{
    res.json(req.user);
} 

