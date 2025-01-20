import BatchModel from "../models/upcoming-batch.model.js";

export class UpcomingBacthController {
  async createBatch(req, res, next) {
    try {
      const batch = await BatchModel.create(req.body);
      return res.status(201).json({
        success: true,
        message: "Batch created successfully",
        data: batch,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllBatchs(req, res, next) {
    try {
      const route = req.query.route;
      const batches = await BatchModel.find({ route });
      if (!batches.length) {
        return res.status(200).json({
          success: false,
          message: "No Data Found",
          data: [],
        });
      }
      return res.status(200).json({
        success: true,
        data: batches,
        total_count: batches?.length,
      });
    } catch (error) {
      next(error);
    }
  }
}
