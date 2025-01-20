import mongoose from "mongoose";

const courseShema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    duration: {
      type: String,
      required: true,
      maxlength: 2,
    },
    description: {
      type: String,
      required: true,
      maxlength: [150, "Description is do not exceed more than 150 characters"],
    },
    course_fee: { type: Number, required: true },
    batch_date: {
      type: String,
      required: true,
    },
    route: {
      type: String,
      required: true,
      unique: true,
    },
    course_img: {
      type: String,
      required: true,
    },
    bg_img: {
      type: String,
      required: true,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
    eligibility: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const courseModel = mongoose.model("Courses", courseShema);

export default courseModel;
