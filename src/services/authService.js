import User from "../models/User.js";
import bcrypt from "bcryptjs";
import ResetPassword from "../models/ResetPassword.js";

const login = async (data) => {
  console.log(data);
  const user = await User.findOne({
    $or: [{ email: data.email }, { phone: data.phone }],
  });
  console.log(user);
  if (!user)
    throw {
      statusCode: 404,
      message: "User not found.",
    };

  const isPasswordMatched = bcrypt.compareSync(data.password, user.password);

  if (!isPasswordMatched) {
    throw {
      statusCode: 400,
      message: "Incorrect email or password",
    };
  }

  return user;
};

const register = async (data) => {
  const user = await User.findOne({
    $or: [{ email: data.email }, { phone: data.phone }],
  });

  if (user)
    throw {
      statusCode: 409,
      message: "User already exists.",
    };

  const hashedPwd = bcrypt.hashSync(data.password);

  return await User.create({
    name: data.name,
    email: data.email,
    password: hashedPwd,
    phone: data.phone,
    address: data.address,
    role: data.role,
  });
};

const forgotPassword = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw {
      statusCode: 404,
      message: "User not found.",
    };
  }

  const otp = Math.floor(Math.random() * 1000000);

  await ResetPassword.create({
    userId: user?._id,
    token: otp,
  });

  // Send email to user
  // {{apiUrl}}/api/auth/reset-password/:userId?token=<otp>

  return { message: "Reset password link has been sent" };
};

const resetPassword = async (userId, token, password) => {
  const data = await ResetPassword.findOne({
    userId,
    expiresAt: { $gt: Date.now() },
  });

  if (!data || data.token !== token) {
    throw {
      statusCode: 400,
      message: "Invalid token.",
    };
  }

  if (data.isUsed) {
    throw {
      statusCode: 400,
      message: "Token already used.",
    };
  }

  const hashedPassword = bcrypt.hashSync(password);

  await User.findByIdAndUpdate(userId, {
    password: hashedPassword,
  });

  await ResetPassword.findByIdAndUpdate(data._id, {
    isUsed: true,
  });

  return { message: "Password reset successful." };
};

export default { login, register, forgotPassword, resetPassword };
