import mongoose from "mongoose";
import { EMAIL_REGEX , PASSWORD_REGEX } from "../constants/regex.js";
import { ROLE_ADMIN ,ROLE_MERCHANT , ROLE_USER } from "../constants/roles.js";

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
        match: [EMAIL_REGEX, "Please enter a valid email"], // Valid email format
        validate:[
          {
            validator:async(value)=>{
              // Check if email already exists in DB
              const existingUser = await mongoose.model("User").findOne({ email: value });
              return !existingUser; // Return false if email exists
            },
            message:"Email is already in use"
          },
            {
                validator: function (value) {
                    return value.endsWith("@gmail.com"); // Allow only Gmail emails
                },
                message: "Only Gmail addresses are allowed"
            }
          ]
      },
      password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"],
        // match: [PASSWORD_REGEX , 
        //     'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
        //   ]
      },
      role: {
        type: [String],
        enum: {values:[ROLE_ADMIN,ROLE_USER,ROLE_MERCHANT], // Restrict values
            message : 'Role must be either "user" ,"merchant" or "admin"'       
        },
        default: ROLE_USER,
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
        city: {
          type: String,
          required: true,
        },
        country: {
          type: String,
          default: "Nepal",
        },
        province : String,
        street :String,
      },
      phone :{
        type : [String,"string type"] ,
        unique : [true , "Phone number must be unique"],
      }
     
})

const model = mongoose.model("User", userSchema);

export default model;