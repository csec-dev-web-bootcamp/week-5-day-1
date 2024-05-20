export function exceptionHandler(err, req, res, next) {
  let message;
  let details;

  try {
    details = JSON.parse(err.message);
    message = details?.message;
  } catch (error) {
    message = err.message;
  }

  res.status(err.statusCode).json({
    error: true,
    statusCode: err.statusCode || 500,
    message: message || 'Something went wrong!',
    details: details || undefined,
    timestamp: new Date().toISOString(),
    path: req.url,
  });
}
