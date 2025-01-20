import mongoose from "mongoose";

import bcrypt from "bcrypt";
import { sendWelcomeEmail } from "../services/email.service.js";

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      minlength: 2,
      maxlength: 50,
      required: [true, "First name is required"],
    },
    last_name: {
      type: String,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email is Already Exist"],
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    mobile_number: {
      type: String,
      required: [true, "Mobile number is required"],
      unique: [true, "Mobile is already exists"],
      match: [/^\d{10}$/, "Mobile number must be 10 digits"],
    },
    password: {
      type: String,
      required: [true, "Password is requried"],
      minlength: 6,
      match: [
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      ],
    },
    age: {
      type: Number,
      min: [18, "Age should be at least 18 years old"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    // gender: {
    //   type: String,
    //   enum: ["male", "female", "other"],
    // },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

//Hash the password before saving in to the database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  return next();
});

userSchema.post("save", async function (doc, next) {
  await sendWelcomeEmail(doc?.email, doc?.first_name);
  next();
});

//Compounding Index for email and mobile number for query performance
userSchema.index({ email: 1, mobile_number: 1 });

const userModel = mongoose.model("Users", userSchema);

export default userModel;
