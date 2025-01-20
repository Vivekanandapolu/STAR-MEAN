export function courseValidation(req, res, next) {
  function checkFields(course) {
    const {
      title,
      duration,
      description,
      course_fee,
      batch_date,
      route,
      course_img,
      bg_img,
      eligibility,
    } = course;

    if (
      !title ||
      !duration ||
      !description ||
      !course_fee ||
      !batch_date ||
      !route ||
      !course_img ||
      !bg_img ||
      !eligibility
    ) {
      return next({
        status: 422,
        success: false,
        message: "Submit All Fields",
      });
    }
  }
  if (req.method == "POST") {
    if (!Array.isArray(req.body)) {
      return next({
        success: false,
        status: 422,
        message: "Requested body shoulb be in the form of Array of Objects",
      });
    }
    for (let course of req.body) {
      checkFields(course);
    }
  }

  if (req.method == "PUT") {
    checkFields(req.body);
  }
  next();
}
