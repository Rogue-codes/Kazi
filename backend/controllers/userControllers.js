import User from "../model/model.js";

export const getUser = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  res.status(200).json({
    status: "success",
    message: "user info retrieved",
    user,
  });
};

export const updateUser = async (req, res) => {
  const { name, email, occupation } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user,
      { name: name, email: email, occupation: occupation },
      {
        new: true,
      }
    ).select("-password")

    res.status(201).json({
        status: "success",
        message: "user information has been updated",
        updatedUser
    })
  } catch (error) {
    res.status(500).json({
        status: "failed",
        message: error.message
    })
  }
};
