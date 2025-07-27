const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  
  console.error(`Error ${status}: ${message}`);
  console.error(err.stack);
  
  res.status(status).json({
    success: false,
    error: {
      code: err.code || 'UNKNOWN_ERROR',
      message: message
    }
  });
};

module.exports = errorHandler;