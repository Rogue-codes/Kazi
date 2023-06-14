import User from "../model/model.js";
import { genAuthToken } from "../utils/genToken.js";

// user registration
export const registerUser = async (req, res) => {
  const { name, email, occupation, password } = req.body;

  try {
    // check if user already exist in DB
    const alreadyExists = await User.findOne({ email });
    if (alreadyExists) {
      return res.status(400).json({
        status: "failed",
        message: "user already exists",
      });
    } else {
      const user = await User.create({ name, email, password, occupation });
      genAuthToken(res, user._id);
      return res.status(201).json({
        status: "success",
        message: "user created successfully",
        data: {
          id: user._id,
          user_name: user.name,
          user_email: user.email,
          user_occupation: user.occupation,
        },
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

// user login (authentication)
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      status: "failed",
      message: "Both email and password are required",
    });
    return;
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(401).json({
      status: "failed",
      message: "Invalid credentials",
    });
    return;
  }

  if (!(await user.matchPassword(password))) {
    res.status(401).json({
      status: "failed",
      message: "Invalid credentials",
    });
    return;
  }

  genAuthToken(res, user._id);

  res.status(200).json({
    status: "success",
    message: "Authentication successful",
    data: {
      id: user._id,
      user_name: user.name,
      user_email: user.email,
      user_occupation: user.occupation,
    },
  });
};

// user logout
export const logout = (req, res) => {
  res.cookie("access_token", "");

  res.status(200).json({
    status: "success",
    message: "User logged out",
  });
};

export const isLoggedIn = (req, res) => {
  const token = req.cookies;
  if (!token) {
    res.json(false);
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (decoded) {
    res.json(true);
  } else {
    res.json(false);
  }
};
