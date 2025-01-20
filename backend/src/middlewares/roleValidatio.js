export function checkRole(role) {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      next();
    } else {
      return res.status(403).json({
        success: false,
        message: "Forbidden: You don't have the necessary permissions",
      });
    }
  };
}
