import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (user)=>{
    return jwt.sign(
        {
            id: user._id,
            role: user.role,
        },
        process.env.JWT_SECRET,
        {
            expireIn: "7d",
        }
    );
};

export const register = async (req,res,next) => {
    try{
        const {name, email, password, role} = req.body;
        
        const existingUser=await User.findOne({email});
        if(existingUser) return res.status(409).json({
            message: "User already exist",
        });

        const hashedPassword = bcrypt.hash(password,10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role :role || "STAFF",
        });

        res.status(201).json({
            message: "User registered successfully",
            user:{
                id : user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        });
    }
    catch(err){
        next(err);
    }
}

export const login = async (req,res,next) => {
    try{
        const {email, password} = req.body;
        
        const user=await User.findOne({email});
        if(!user) return res.status(401).json({
            message: "Invalid email or password",
        });

        const passwordMatch  = bcrypt.compare(password,user.password);
        if(!passwordMatch) return res.status(401).json({
            message:"Invalid email or password",
        });

        const token = generateToken(user);

        res.status(200).json({
            message: "User logged in successfully",
            token,
            user:{
                id : user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        });
    }
    catch(err){
        next(err);
    }
}