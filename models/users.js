import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
      maxlength: 50,
      minlength: 3,
    },
    phone: {
      type: String,
      required: [true, "Please provide phone"],
      maxlength: 50,
      minlength: 10,
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: 6,
      maxlength: 12,
    },
    image: {
      type: String,
    },
    nin:{
      type:String,
    },
    gender:{
      type:String,
    },
    address:{
      type:String,
    },
    role: {
      type: String,
      enum: ["Manager", "Cashier"],
      default: "Cashier",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.createJWT = function () {
  return jwt.sign(
    {
      userId: this._id,
      nin: this.nin,
      role: this.role,
      name: this.name,
      phone: this.phone,
      email: this.email,
      image: this.image,
      gender: this.gender,
      address: this.address,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "24h",
    }
  );
};

userSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

const user = mongoose.model("user", userSchema);

export default user;
