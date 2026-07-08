const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name or Email or password are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const newUser = User({
      name,
      email,
      password: hashed,
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "user registration successfull",
      data: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    next(error);
  }
};
const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // ১. ইনপুট ভ্যালিডেশন
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // ২. ইউজার খোঁজা
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // ৩. পাসওয়ার্ড চেক
    const checkPass = await bcrypt.compare(password, existingUser.password);
    if (!checkPass) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // ৪. পেলোড তৈরি
    const payload = {
      id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
    };

    // ৫. আলাদা আলাদা Secret Key ব্যবহার করা (প্রোডাকশনে env ফাইল আপডেট করে নেবেন)
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "1d",
    });

    // ৬. কুকি সেট করা (টোকেনের মেয়াদের সাথে মিলিয়ে)
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    // ৭. রেসপন্স পাঠানো
    return res.status(200).json({
      success: true,
      message: "Login successfully",
      user: payload,
      accessToken: `Bearer ${accessToken}`,
    });
  } catch (error) {
    next(error);
  }
};

const refreshTokenController = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token is required",
      });
    }
    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    } catch (tokenError) {
      // টোকেন অবৈধ বা এক্সপায়ারড হলে
      return res.status(403).json({
        success: false,
        message: "Invalid or expired refresh token",
      });
    }
    const user = await User.findById(decoded.id);

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credential" });
    }
    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    // ৫. আলাদা আলাদা Secret Key ব্যবহার করা (প্রোডাকশনে env ফাইল আপডেট করে নেবেন)
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "15m",
    });

    const newRefreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "1d",
    });

    // ৬. কুকি সেট করা (টোকেনের মেয়াদের সাথে মিলিয়ে)
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    // ৭. রেসপন্স পাঠানো
    return res.status(200).json({
      success: true,
      message: "Token refreshed successfully",
      user: payload,
      accessToken: `Bearer ${accessToken}`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerController,
  loginController,
  refreshTokenController,
};
