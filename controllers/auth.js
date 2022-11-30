import User from "../models/users.js";
import asyncWrapper from "../middleware/async.js";

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

export const getUsers = asyncWrapper(async (req, res) => {
  const users = await User.find({});
  res.status(200).json({ users });
});

// export const getUser = asyncWrapper(async (req, res) => {
//   const { id: userID } = req.params;
//   const user = await Product.findOne({ _id: userID });
//   if (!user) {
//     return res.status(404).json({ msg: `No user with id: ${userID}` });
//   }
//   res.status(200).json({ user });
// });

// export const updateUser = asyncWrapper(async (req, res) => {
//   const { id: userID } = req.params;

//   const user = await User.findByIdAndUpdate(
//     { _id: userID },
//     req.body,
//     {
//       new: true,
//       runValidators: true,
//     }
//   );

//   if (!user) {
//     return res.status(404).json({ msg: `No product with id: ${userID}` });
//   }

//   res.status(200).json({ user });
// });

export const dashboard = async (req, res) => {
  res.status(200).json({
    msg: `Hello`,
    secret: `Welcome to Dashboard`,
  });
};
