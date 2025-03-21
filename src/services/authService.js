import User from "../models/User.js"
import bcrypt from "bcryptjs";

const  login = async (data) =>{
    console.log(data);
 const user = await User.findOne({
    $or: [{ email: data.email }, { phone: data.phone }]
});
console.log(user);
 if(!user) throw {
    statusCode: 404,
    message: "User not found.",
  };

    const isPasswordMatched = bcrypt.compareSync(data.password,user.password);

    if(!isPasswordMatched) {
        throw {
            statusCode : 400 ,
            message : "Incorrect email or password"
        }
    }

 return user;
}

const register = async (data) => {
    const user = await User.findOne({
        $or: [{ email: data.email }, { phone: data.phone }]
    });

    if(user) throw {
        statusCode : 409 ,
        message : "User already exists."
    };

    const hashedPwd = bcrypt.hashSync(data.password);

    return await User.create({
        name: data.name,
        email: data.email,
        password: hashedPwd,
        phone:data.phone,
        address:data.address,
        role:data.role
    })
}


export default {login ,register};
