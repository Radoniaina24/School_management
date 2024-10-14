const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

async function getAllUser(req, res) {
  try {
    const users = await User.find();
    const totale = await User.countDocuments();
    res.status(200).json({
      status: "success",
      message: "Users fetched successfully",
      totale,
      results: users.length,
      users,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
async function getOneUser(req, res) {
  const uid = req.params.uid;
  let user;
  try {
    user = await User.find({ _id: uid });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
  res.status(200).json({ user });
}
async function postUser(req, res) {
  const { fullname, email, password } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      throw new Error("User already exist");
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    //create user
    const user = await new User({
      fullname,
      email,
      password: hashPassword,
    });
    await user.save();
    // OR
    // const user = await User.create({name, email})
    res.status(201).json({
      message: "User registered Successfully",
      data: user,
    });
  } catch (err) {
    throw new Error(err.message);
  }
}
async function updateUser(req, res) {
  const uid = req.params.uid;
  const { fullname, email } = req.body;

  const query = { _id: uid };
  try {
    await User.findOneAndUpdate(query, { fullname, email });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
  res.status(200).json({ message: "L'utilisateur est à jour avec success" });
}
async function loginUser(req, res) {
  const { email, password } = req.body;
  const userFound = await User.findOne({ email });

  if (userFound && (await bcrypt.compare(password, userFound?.password))) {
    const token = generateToken(userFound?._id);
    res.json({
      status: "success",
      message: "User logged in successfully",
      userFound,
      token,
    });
  } else {
    throw new Error("Invalid login credentials");
  }
}
async function updateShippingAddress(req, res) {
  const {
    firstName,
    lastName,
    address,
    city,
    postalCode,
    province,
    country,
    phone,
  } = req.body;
  const user = await User.findByIdAndUpdate(
    req.userAuthId,
    {
      shippingAddress: {
        firstName,
        lastName,
        address,
        city,
        postalCode,
        province,
        country,
        phone,
      },
      hasShippingAddress: true,
    },
    {
      new: true,
    }
  );
  res.json({
    status: "success",
    message: "User shipping address update successfully",
    user,
  });
}
async function deleteUser(req, res) {
  const uid = req.params.uid;
  try {
    await User.deleteOne({ _id: uid });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
  res.status(200).json({ message: "success" });
}
async function getUserProfile(req, res) {
  res.status(200).json({
    message: "welcome to the profile page",
  });
}

module.exports = {
  getAllUser,
  getUserProfile,
  postUser,
  getOneUser,
  deleteUser,
  updateUser,
  loginUser,
  updateShippingAddress,
};
