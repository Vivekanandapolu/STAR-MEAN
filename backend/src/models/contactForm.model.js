import mongoose from "mongoose";

const contactFormSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "First name is required"],
    },
    last_name: {
      type: String,
      required: [true, "Last name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    mobile_number: {
      type: String,
      required: [true, "Mobile number is required"],
      match: [/^\d{10}$/, "Mobile number must be 10 digits"],
    },
    qualification: {
      type: String,
      required: [true, "Qualification is required"],
    },
    route: {
      type: String,
      default: "/courses/ui-ux-design",
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

const contactModel = mongoose.model("CourseContacts", contactFormSchema);

export default contactModel;
