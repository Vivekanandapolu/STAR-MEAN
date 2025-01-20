import mongoose from "mongoose";

const supportShema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    contact_type: {
      type: String,
      required: true,
      lowercase: true,
      enum: ["whatsapp", "phone", "email"],
    },
    contact_info: {
      type: String,
      required: true,
      unique: true,
    },
    message: {
      type: String,
      required: true,
      maxlength: [200, "Maximum no. of characters required"],
    },
    isAccepted: {
      required: true,
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const supportModel = mongoose.model("Support", supportShema);

export default supportModel;
