// Middleware for handling 404 errors
const handleNotFound = (req, res, next) => {
    res.status(404).json({ error: "🔍 Resource not found" });
  };
  
  // Middleware for handling global errors
  const globalErrorHandler = (err, req, res, next) => {
    console.error("🔥 Error:", err.stack);
    res.status(err.status || 500).json({
      error: err.message || "Something went wrong! Please try again.",
    });
  };
  
  export { handleNotFound, globalErrorHandler };
  