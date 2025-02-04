export function courseValidation(req, res, next) {
  function checkFields(course) {
    const keys = [
      "title",
      "duration",
      "description",
      "course_fee",
      "batch_date",
      "route",
      "course_img",
      "bg_img",
    ];

    //Store the missed keys from the request body
    const missedKeys = keys.filter((key) => !course[key]);
    if (missedKeys.length > 0) {
      return next({
        status: 422,
        success: false,
        message: `Following fields are unset -> ${missedKeys.join(" ,")}`,
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
