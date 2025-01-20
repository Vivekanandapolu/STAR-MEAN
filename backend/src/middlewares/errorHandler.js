const errorHandler = (err, req, res, next) => {
  return res.status(err.status || 500).json({
    success: err.success || false,
    message: err.message || "Internal server error",
  });
};
export default errorHandler;
