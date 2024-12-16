import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bycrpt from 'bcrypt'
import validator from "validator"


// login User
const loginUser = async(req, res) =>{
    const {email, password} = req.body;
    try {
        const user = await userModel.findOne({email})

        if (!user) {
            return res.json({success:false, message:"User Doesn't exist"})
        }

        const isMatch = await bycrpt.compare(password, user.password)
        if (!isMatch){
            return res.json({success:false, message:"Invalid credentials"})
        }

        const token = createToken(user._id);
        res.json({success:true,token})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
        
    }
}

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET )
}

//register User 
const registerUser = async(req, res) =>{
    const {name, password, email} = req.body;
    try {
        // checking is the user already exists
        const exists = await userModel.findOne({email});
        if (exists) {
            return res.json({success:false,message:"user Already Exists"})
        }

    // validating email format and Strong Password.
    if(!validator.isEmail(email)) {
        return res.json({success:false,message:"Please enter a vaild email"})

    }

    if (password.length<8){
        return res.json({success:false,message:"Please enter a Strong Password"})
    }

    //hashing user password
    const salt = await bycrpt.genSalt(10)
    const hashedPassword = await bycrpt.hash(password, salt);

    const newUser = new userModel({
        name:name,
        email:email,
        password:hashedPassword
    })

    const user = await newUser.save()
    const token = createToken(user._id)
    res.json({success:true, token})
    
    
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
        
    }
}

export {loginUser, registerUser}