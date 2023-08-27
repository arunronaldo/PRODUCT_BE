const Register = require("../Models/registerModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const checkUser = await Register.findOne({ email });
    if (checkUser) {
      return res.status(500).json({
        message: "User Already exists",
      });
    }
    const pswrd = await bcrypt.hash(password, 10);
    const registerUser = new Register({
      name,
      email,
      password: pswrd,
    });
    await registerUser.save();
    res.json(registerUser);
  } catch (error) {
    res.status(500).json({
      message: "Not registered",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //mail check
    const mailCheck = await Register.findOne({ email });
    if (!mailCheck) {
      return res.status(200).json({
        message: "Invalid eamil or password",
      });
    }

    // password check
    const checkPassword = await bcrypt.compare(password, mailCheck.password);
    if (!checkPassword) {
      return res.status(200).json({
        message: "Invalid email or password",
      });
    }

    //Generate JWT Token
    const jwttkn = await jwt.sign(
      { userId: mailCheck._id },
      process.env.JSON_WEB_KEY
    );
    res.json({
      status: true,
      data: mailCheck,
      token: jwttkn,
      message: "Login Sucessfully"
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Not registered",
    });
  }
};
