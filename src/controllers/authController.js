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

export  { login ,register};