import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

// REGISTER
export const registerUser = async (req, res) => {

  try {
    const {username,password} = req.body
    // Check if user already exists
    const oldUser = await UserModel.findOne({ username });
    if (oldUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    req.body.password = hashedPass

    // Create new user
    const newUser = new UserModel(req.body);

    const user = await newUser.save();
    const token = jwt.sign({
      username: user.username, id: user._id
    }, process.env.JWT_KEY, {expiresIn: '1h'})

    // Remove password before sending response
    const { password: _, ...userData } = user._doc;

    res.status(201).json({ user: userData, token: token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    // Compare password
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign(
      { username: user.username, id: user._id },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );

    // Remove password before sending response
    const { password: _, ...userData } = user._doc;

    res.status(200).json({ user: userData, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
