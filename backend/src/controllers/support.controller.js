import supportModel from "../models/contactSupport.model.js";

export class SupportController {
  //Create Support for user
  async createSupport(req, res, next) {
    try {
      const { name, contact_type, contact_info, message } = req.body;
      if (!name || !contact_info || !contact_type || !message) {
        return next({
          success: false,
          status: 400,
          message: "Enter All Fields",
        });
      }

      const support = await supportModel.findOne({
        $and: [
          { contact_type: req.body.contact_type },
          { contact_info: req.body.contact_info },
        ],
      });
      if (support) {
        return next({
          success: false,
          status: 400,
          message: "Contact info is already in use",
        });
      }
      await supportModel.create(req.body);

      return res.status(201).json({
        success: true,
        message: "Thanks for contacting us!",
      });
    } catch (error) {
      next(error);
    }
  }
}
