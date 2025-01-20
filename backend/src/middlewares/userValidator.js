import bcrypt from "bcrypt";

export function userValidator(err, req, res, next) {
  const { first_name, email, mobile_number, password } = req.body;
  if (!first_name || !email || !mobile_number || password) {
    return next({
      status: err.status || 400,
      message: err.message || "Enter all fields",
      success: false,
    });
  }

  return next();
}

export async function passwordChecker(password, hashPassword) {
  const isMatch = await bcrypt.compare(password, hashPassword);
  return isMatch;
}

export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(12);
  const hash_password = await bcrypt.hash(password, salt);
  return hash_password;
}
