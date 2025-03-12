import mongoose from "mongoose";
import { EMAIL_REGEX , PASSWORD_REGEX } from "../constants/regex.js";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minlength: [3, "Name must be at least 3 characters"],
        max_length: [50, "Name cannot exceed 50 characters"],
      },
      email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        match: [/.+\@.+\..+/, "Please enter a valid email"], // Valid email format
        validate:{
            validator:(value)=>{
                return EMAIL_REGEX.test(value);
            },
            message:"Invalid email address"
        }
      },
      password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"],
        select: false, // Prevents password from being returned in queries
        match: [PASSWORD_REGEX , 
            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
          ]
      },
      role: {
        type: String,
        enum: {values:["user", "admin"], // Restrict values
            message : 'Role must be either "user" or "admin"'       
        },
        default: "user",
      },
      profileImageUrl: {
        type: String, // URL to the profile picture
        default: "https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?semt=ais_hybrid", // Default avatar
      },
      isVerified: {
        type: Boolean,
        default: false, // Default: user is not verified
      },
      createdAt: {
        type: Date,
        default: Date.now, // Automatically set creation date
      },
      address : {
        city : String ,
        country:String,
        province : String,
        city :String,
      }
})

const model = mongoose.model("User", userSchema);

export default model;