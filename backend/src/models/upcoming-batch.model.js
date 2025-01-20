import mongoose from "mongoose";

const batchSchema = new mongoose.Schema(
  {
    nextBatchFrom: {
      type: String,
      required: [true, "Batch date required"],
    },
    duration: {
      type: String,
      required: [true, "Duration is required"],
    },
    days: {
      type: String,
      required: [true, "End date is required"],
    },
    training_type: {
      type: String,
      required: [true, "Mode of Training is required"],
    },
    timings: {
      type: String,
      required: [true, "Start and End time is required"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    course_fee: {
      type: String,
      required: [true, "Course Fee is required"],
    },
    vacancies: {
      type: String,
      required: [true, "No. of Vacancies is required"],
      maxlength: 3,
    },
    route: {
      type: String,
      required: [true, "Route name is required"],
    },
  },
  {
    timestamps: true,
  }
);

const BatchModel = mongoose.model("Batches", batchSchema);

export default BatchModel;
