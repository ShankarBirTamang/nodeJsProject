import { ROLE_MERCHANT, ROLE_USER } from "../constants/roles.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

const createUser = async (data) => {
  return await User.create(data);
};

const createMerchant = async (data) => {
  const user = await User.findOne({
    $or: [{ email: data.email }, { phone: data.phone }],
  });

  if (user) {
    throw {
      statusCode: 409,
      message: "User already exists.",
    };
  }

  const hashedPwd = bcrypt.hashSync(data.password);

  return await User.create({
    address: data.address,
    name: data.name,
    phone: data.phone,
    email: data.email,
    password: hashedPwd,
    role: [ROLE_USER, ROLE_MERCHANT],
  });
};

const updateUser = async (id, data) => {
  const updateData = {
    address: data.address,
    name: data.name,
    phone: data.phone,
  };

  if (data.password) updateData.password = bcrypt.hashSync(data.password);

  return await User.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};

const getAllUser = async () => {
  return await User.find();
};
const getAllCustomer = async () => {
  return await User.find({
    role: [ROLE_USER],
  });
};

const getUserByID = async (id) => {
  return await User.findById(id);
};

// const updateUserByID = async(id, data)=>{
//     return await User.findByIdAndUpdate(id, data, {new: true , runValidators:true} );
// }

const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

const uploadProfileImage = () => {
  console.log("Upload profile Image");
};
export default {
  createUser,
  createMerchant,
  getAllUser,
  getAllCustomer,
  getUserByID,
  updateUser,
  deleteUser,
  uploadProfileImage,
};
