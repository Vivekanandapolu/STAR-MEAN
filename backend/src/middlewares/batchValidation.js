export function batchValidator(req, res, next) {
  const {
    nextBatchFrom,
    duration,
    days,
    training_type,
    timings,
    location,
    course_fee,
    vacancies,
  } = req.body;

  if (
    !nextBatchFrom ||
    !duration ||
    !days ||
    !training_type ||
    !timings ||
    !location ||
    !course_fee ||
    !vacancies
  ) {
    return next({
      status: 400,
      message: "Enter all Fields",
      success: false,
    });
  }
  next();
}
