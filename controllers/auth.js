import User from "../models/users.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ msg: "Please provide name, email and password" });
  }
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  console.log(user);
  res.status(201).json({
    user: {
      nin: user.nin,
      name: user.name,
      role: user.role,
      email: user.email,
      image: user.image,
      phone: user.phone,
      gender: user.gender,
      address: user.address,
    },
    token,
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Please provide email and password" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ msg: "Invalid Credentials" });
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    return res.status(401).json({ msg: "Invalid Credentials" });
  }

  const token = user.createJWT();
  res.status(200).json({
    user: {
      nin: user.nin,
      name: user.name,
      role: user.role,
      email: user.email,
      image: user.image,
      phone: user.phone,
      gender: user.gender,
      address: user.address,
    },
    token,
  });
};

export const dashboard = async (req, res) => {
  res.status(200).json({
    msg: `Hello`,
    secret: `Welcome to Dashboard`,
  });
};
