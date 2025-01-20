import contactModel from "../models/contactForm.model.js";

export class ContactCourseController {
  async addContactCourse(req, res, next) {
    try {
      const {
        first_name,
        last_name,
        email,
        gender,
        qualification,
        mobile_number,
      } = req.body;
      if (
        !first_name ||
        !last_name ||
        !email ||
        !gender ||
        !qualification ||
        !mobile_number
      ) {
        return next({
          status: 422,
          success: false,
          message: "Unprocessable entity : Enter all Fields",
        });
      }

      const checkContacts = await contactModel.findOne({
        $and: [
          { mobile_number },
          { route: req.body?.route || "/courses/ui-ux-design" },
        ],
      });

      if (checkContacts) {
        return next({
          success: false,
          message: `Already Contacted With this Mobile number ${mobile_number}`,
          status: 400,
        });
      }
      const contact = await contactModel.create(req.body);
      return res.status(201).json({
        success: true,
        message: "Contacted Successfully",
        data: contact,
      });
    } catch (error) {
      next(error);
    }
  }
}
