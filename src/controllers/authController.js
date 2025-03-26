import { PASSWORD_REGEX } from "../constants/regex.js";
import formatUserData from "../helpers/dataFormatter.js";
import authService from "../services/authService.js"
import {createJWT} from "../utils/jwt.js";

const login = async(req,res)=>{
    try {
        const {email,phone ,password} = req.body;
        // console.log(req.body);
        if (!email && !phone)
            return res.status(422).send("Email or phone is required.");
      
          if (!password) return res.status(422).send("Password is required.");
      

        const data = await authService.login(req.body);
        const formattedData = formatUserData(data);
        const token = createJWT(formattedData);

        console.log(`token from controller: ${token}`);

        res.cookie("authToken",token);
        res.json(formattedData);
        // res.json(data);
    } catch (error) {
        res.status(error.statusCode || 500).send(error.message);
    }
};

const register = async(req,res)=>{
    try {
        const {name,email,phone,password,address,confirmPassword} = req.body;

        if(!email) return res.status(422).send("Email is required.");
        if(!name) return res.status(422).send("Name is required.");
        if(!phone) return res.status(422).send("Phone is required.");
        if(!password)  return res.status(422).send("Password is required.");
        if (!confirmPassword)  return res.status(422).send("Confirm password is required.");
        if(!address?.city) return res.status(422).send("City is required.");
        if(!PASSWORD_REGEX.test(password)) return res.status(422).send("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.")
        if(password != confirmPassword) return res.status(422).send("Password does not match.")
            
        const data = await authService.register(req.body);
        const formattedData = formatUserData(data);
        const token = createJWT(formattedData);
        res.json(formattedData);
        res.cookie("authToken",token);
    } catch (error) {
        res.send(error.message);
    }
}

const logOut = (req,res) => {
    res.clearCookie("authToken");
    res.json({"message":"Logged Out successfully"});
}

/**
 * 1. User forgot password
 * 2. User request for reset password in email
 * 3. User gets email
 * 4. Email has reset password link
 */

const forgotPassword = async (req,res) => {
    const email = req.body.email;
    if(!email) return res.status(422).send("Email is required");
    const data = await authService.forgotPassword(req.body.email);
    res.json(data);
}


const resetPassword = async (req, res) => {
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const token = req.query.token;
    const userId = req.params.userId;
  
    if (!password) return res.status(422).send("Password is required.");
    if (!confirmPassword)
      return res.status(422).send("Confirm password is required.");
  
    if (password != confirmPassword)
      return res.status(422).send("Passwords do not match.");
  
    try {
      const data = await authService.resetPassword(userId, token, password);
      console.log(data);
      res.json(data);
    } catch (error) {
      res.status(error.statusCode || 500).send(error.message);
    }
  };

export  { login ,register ,logOut,forgotPassword,resetPassword};